/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */

class SearchBlock {
  constructor( element ) {
    this.input = element.querySelector('input');
    this.addButton = element.querySelector('.add');
    this.replButton = element.querySelector('.replace');
    this.registerEvents();
    this.photos = [];
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    
    this.addButton.addEventListener('click', () => {
      if(this.input.value.trim() != "") {
        function callbackFunc(result) {
          VK.processData(result);
        };              
        VK.get(Number(this.input.value), callbackFunc);
        
      }
    
    
    });

    this.replButton.addEventListener('click', () => {
      if(this.input.value.trim() != "") {
        console.log('удалите ранее отрисованные изображения');
      }
    });
    
  }

}
