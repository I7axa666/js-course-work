/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    if (localStorage.getItem('yandexToken')) {
      return localStorage.getItem('yandexToken')
    } else {
      const userToken = prompt('Введите токен яндекс диска:');
      localStorage.setItem('yandexToken', userToken);
      return userToken;
    }
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    let options = {
      method: 'POST',
      url: this.HOST + '/resources/upload?path=' + path + '&url=' + encodeURIComponent(url),
      callback: callback
    };
    createRequest(options);
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    let options = {
      method: 'DELETE',
      url: this.HOST + '/resources?path=' + path,
      callback: callback
    };
    createRequest(options);
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    let options = {
      method: 'GET',
      url: this.HOST + '/resources/files?media_type=image',
      callback: callback
    };
    createRequest(options);
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    const link = document.createElement('a');
    link.href = url;
    link.click();
    link.remove();
  }
}
