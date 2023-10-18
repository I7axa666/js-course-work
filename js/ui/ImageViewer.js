/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.picList = element.querySelector('.row');
    this.selectAllButton = element.querySelector('.select-all');
    this.sendButton = element.querySelector('.send');
    this.imagePreview =  element.querySelector('.ui.fluid.image');
    this.registerEvents();
      
    
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.picList.addEventListener('dblclick', (ev) => {
      if(ev.target.tagName == 'IMG') {
        this.imagePreview.src = ev.target.src
      }
    })

    this.picList.addEventListener('click', (ev) => {
      if(ev.target.tagName == 'IMG') {
        ev.target.classList.toggle('selected');
        this.checkButtonText()
        
      }
    })

    this.selectAllButton.addEventListener('click', () => {
      let selectedPic = this.picList.querySelectorAll('img');
      if(!this.picList.querySelector('.selected')){
        selectedPic.forEach(el => {
          el.classList.add('selected');
          this.checkButtonText()
        });
      } else { 
        this.picList.querySelectorAll('.selected').forEach(el => {
          el.classList.remove('selected');
          this.checkButtonText()
        })
      }
      
    })
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {

  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if(images.length > 0) {
      this.selectAllButton.classList.remove('disabled');
      images.forEach(el => {
        
        let divPic = document.createElement('DIV');
        divPic.classList.add('four', 'wide', 'column', 'ui', 'medium', 'image-wrapper');
        this.picList.appendChild(divPic);
        let img = document.createElement('IMG');
        img.src = el;
        divPic.appendChild(img);
        
      })
    } else {
      if(!this.selectAllButton.classList.contains('disabled')){
        this.selectAllButton.classList.add('disabled');
      };
    }

  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    if(this.picList.querySelectorAll('.selected').length > 0) {
      this.selectAllButton.textContent = "Снять выделение";
      this.sendButton.classList.remove('disabled');

    } else {
      this.selectAllButton.textContent = "Выбрать всё";
      this.sendButton.classList.add('disabled');
    }
  }

}