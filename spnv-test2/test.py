from PIL import Image
import sys
import time
import os
import paramiko 

# time.sleep(3)
full_path = '/Users/jungjiyeon/Downloads/' + sys.argv[1]
img = Image.open(full_path)
print(full_path)

try:  
    # ssh client 생성
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect('117.16.17.162', '10022', 'skt1', 'miplab123')
    print('ssh connected')

    # File Upload
    sftp = ssh.open_sftp()
    src = full_path
    dst = '/data2/jyjung/test_image/input.png'
    sftp.put(src, dst)
    print('sftp upload success')

    # 원격 서버에 명령 실행
    cmd = 'source ~/.bashrc \n source /home/skt/anaconda3/etc/profile.d/conda.sh \n cd /data2/jyjung/spnv-image-restoration \n conda activate spnv-image-restoration \n python3 ir_inference_torch.py --model_opt ./trained_models/train_RealESRGANx2plus_400k_B12G4/ir_model_rrdbnet_RealESRGAN_x2plus.yml --use_amp --input ../test_image/input.png --output ../output_image/output.png --model_device_id 0 \n'

    (stdin, stdout, stderr) = ssh.exec_command(cmd)
    for line in iter(stdout.readline, ""):
        print(line, end="")

    exit_status = stdout.channel.recv_exit_status()

    if exit_status == 0:
        print("\nFile processed")
    else:
        print("\nError", exit_status)

    stdin.flush()
    stdin.close()
    print('transform success')

    # File Download
    sftp = ssh.open_sftp()  
    src = '/data2/jyjung/output_image/output.png'
    dst = '/Users/jungjiyeon/VSProjects/spnv-test2/public/images/output.png'
    sftp.get(src, dst)
    print('sftp download success')

except Exception as err:
    print(err)

finally:
    sftp.close()  
    ssh.close()







