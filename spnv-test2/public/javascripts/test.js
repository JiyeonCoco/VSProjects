$(function(){
    var cropper;
    // 사진 업로드 버튼
    $('#photoBtn').on('change', function(){
        $('.them_img').empty().append('<img id="image" src="">');
        var image = $('#image');
        var imgFile = $('#photoBtn').val();
        var fileForm = /(.*?)\.(jpg|jpeg|png)$/;
    
        // 이미지가 확장자 확인 후 노출
        if(imgFile.match(fileForm)) {
          var reader = new FileReader(); 
          reader.onload = function(event) { 
            image.attr("src", event.target.result);
            cropper = image.cropper( {
              dragMode: 'move',
              viewMode:1,
              aspectRatio: 1,
              autoCropArea:0.9,
              minCropBoxWidth:200,
              restore: false,
                    guides: false,
                    center: false,
                    highlight: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    toggleDragModeOnDblclick: false
                });
            }; 
          reader.readAsDataURL(event.target.files[0]);
        } else{
          alert("이미지 파일(jpg, png형식의 파일)만 올려주세요");
          $('#photoBtn').focus();
          return; 
        }
    });
    // 업로드 버튼
    $('#complete').on('click', function(){
      $('.them_img').append('<div class="result_box"><img id="result" src=""></div>');
      var image = $('#image');
      var result = $('#result');
      var canvas;
      if($('input[type="file"]').val() != ""){
      canvas = image.cropper('getCroppedCanvas',{
        width:200,
        height:200
      });
      result.attr('src',canvas.toDataURL("image/jpg"));

      canvas.toBlob(function(blob) {

        var formData = new FormData();

        $.ajax({
              url: '/',
              type: 'POST',
              data: formData,
              processData: false,
              contentType: false,
              success: function () {
                alert('업로드 성공');
              },
              error: function () {
                alert('업로드 실패');
                $('.result_box').remove()
              },
        });
      })
      }
    });
  });