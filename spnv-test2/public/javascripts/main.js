$(function(){   

    var i = 0;
    function move() {
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = 1;
            var id = setInterval(frame, 120);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                    $('#trans_btn').css('background-color', '#FF7A00');
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }
        }
    }

    var cropper;

    // Select File 버튼 클릭 시
    $('#select_file').on('change', function(event) {

        var image = $('#before_img');
        var file_name = $('#select_file').val();
        var file_form = /(.*?)\.(jpg|jpeg|png)$/;

        // 이미지 확장자 확인 후 노출
        if(file_name.match(file_form)) {

            var reader = new FileReader();
            $('.upload_txt')[0].value = file_name;

            reader.onload = () => {
                image.attr("src", reader.result);

                cropper = image.cropper( {
                    dragMode: 'crop',
                    viewMode: 1,
                    restore: true,
                    guides: false,
                    center: false,
                    highlight: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    toggleDragModeOnDblclick: false
                });
            };
            reader.readAsDataURL(event.target.files[0]);
            $('#trans_btn').css('display', 'none');
            $('#crop_btn').css('display', 'block');
        }
        else {
            alert("이미지 파일(jpg, jpeg, png형식의 파일)만 올려주세요");
            $('#select_file').focus();
            return; 
        }
    });

    // Crop 버튼 클릭 시
    $('#crop_btn').on('click', function() {
        var canvas;
        var image = $('#before_img');
        var file_name = $('.upload_txt').val().split('\\').reverse()[0];
        file_name = file_name.slice(0, file_name.length - 4) + '_croped.png';

        if($('input[type="file"]').val() != "") {
            canvas = image.cropper('getCroppedCanvas', {
                minWidth: 360,
                minHeight: 480,
            });
            console.log(canvas);

            $('.before_img_box').empty().append('<img id="before_img">');
            $('#before_img').attr('src', canvas.toDataURL("image/png"));
            $('#crop_btn').css('display', 'none');
            $('#trans_btn').css('display', 'block');
            $('#char_txt').css('display', 'block');
            $('#char_img').css('display', 'block');
            $('#myProgress').css('display', 'block');
            move();


            canvas.toBlob(function(blob) {

                var URL = window.URL || window.webkitURL;
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download =  file_name;
                link.click();

                $.ajax({
                    url: '/',
                    type: 'POST',
                    data: {'fileName': file_name},
                    success: function (result) {
                        console.log('업로드 성공');
                    },
                    error: function () {
                        console.log('업로드 실패');
                    },
                });
            })
        }
    });

    // 변환하기 버튼 클릭 시
    $('#trans_btn').on('click', function() {
        $('#char_txt').css('display', 'none');
        $('#char_img').css('display', 'none');
        $('#myProgress').css('display', 'none');
        file_name = '/images/output.png';
        $('#after_img').attr('src', file_name);
    });
});