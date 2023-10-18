/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = "a2d8951fa2d8951fa2d8951fb5a1cd61e5aa2d8a2d8951fc7f2f5d100529d9273d07859";
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    if(typeof(callback) == 'function'){
      let funcScript = document.createElement('SCRIPT');
      funcScript.classList.add("for-vk");
      funcScript.textContent = callback;
      document.getElementsByTagName("body")[0].appendChild(funcScript);

      let script = document.createElement('SCRIPT');
      script.classList.add("for-vk");
      script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.154&callback=callbackFunc`;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    if(typeof(callback) == 'object') {
      App.imageViewer.drawImages(callback);
    }
    
    
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    
    this.lastCallback = result;

    if(result['error']) {
      return alert(result['error']['error_msg']);
    }

    this.lastCallback = result;
    document.querySelectorAll('.for-vk').forEach(el => el.remove());

    const fotoArray = this.lastCallback['response']['items'];
    let photos = [];

    for (let i = 0; i < fotoArray.length; i ++) {
      let sizeNumb = fotoArray[i]['sizes'].length-1;
      photos.push(fotoArray[i]['sizes'][sizeNumb]['url']);
    }
 
    this.get('', photos)
    this.lastCallback = () => {};
    ;
  }
}
