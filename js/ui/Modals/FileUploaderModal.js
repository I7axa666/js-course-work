/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.xIcon = element[0].querySelector('.x.icon');
    this.closeButton = element[0].querySelector('.close');
    this.sclollContent = element[0].querySelector('.scrolling.content');
    this.sendButton = element[0].querySelector('.send-all');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.xIcon.addEventListener('click',() => {
      App.modals.fileUploader.close();
    })

    this.closeButton.addEventListener('click',() => {
      App.modals.fileUploader.close();
    })

    this.sclollContent.addEventListener('click', (ev) => {
      if(ev.target.classList.contains('button')) {
        this.sendImage(ev.target.closest('.image-preview-container'))
      }
    })

    this.sendButton.addEventListener('click',() => {
      this.sendAllImages();
    })
    
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    images.reverse();
    let markup = []
    images.forEach(img => {
      markup.push(this.getImageHTML(img));
    })
    this.sclollContent.innerHTML = markup.join('');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
      return `<div class="image-preview-container"><img src=${item}><div class="ui action input"><input type="text" placeholder="Путь к файлу"><button class="ui button"><i class="upload icon"></i></button></div></div>`
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    this.sclollContent.querySelectorAll('.image-preview-container').forEach((el) => {
      this.sendImage(el);
    })
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    let path = imageContainer.querySelector('input').value.trim().replace(/[<,>,"]/g, "_");
    if(path) {
      imageContainer.querySelector('.action').classList.add('disabled');
      let url = imageContainer.querySelector('img').src;
      Yandex.uploadFile(path, url, () => {
        imageContainer.remove();
        if(this.sclollContent.childNodes.length === 0) {
          App.modals.fileUploader.close();
        }
      });
    } else {
      imageContainer.querySelector('.action').classList.add('error');
    }
  }
}