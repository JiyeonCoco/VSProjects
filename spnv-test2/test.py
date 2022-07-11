from PIL import Image
import sys
import time

print('#Hello from python#')

print('First param:'+sys.argv[1]+'#')

time.sleep(3)
img = Image.open('/Users/jungjiyeon/Downloads/' + sys.argv[1])
print(img)
file_name = sys.argv[1][:-11] + '_SR.png'
img = img.save('/Users/jungjiyeon/VSProjects/spnv-test2/public/images/' + file_name)