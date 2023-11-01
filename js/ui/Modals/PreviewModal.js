/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.xIcon = element[0].querySelector('.x.icon');
    this.sclollContent = element[0].querySelector('.scrolling.content');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.xIcon.addEventListener('click',() => {
      App.modals.filePreviewer.close();
    })

    this.sclollContent.addEventListener('click', (ev) => {
      if(ev.target.classList.contains('delete')) {
        ev.target.querySelector('i').classList.add('icon', 'spinner', 'loading');
        ev.target.classList.add('disabled');
        Yandex.removeFile(ev.target.getAttribute('data-path'), () => {ev.target.closest('.image-preview-container').remove()})
      }

      if(ev.target.classList.contains('download')) {
        Yandex.downloadFileByUrl(ev.target.getAttribute('data-file'));
      }
    })
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    // data.items.reverse();
    let markup = [];
    data.items.forEach(item => {
        markup.push(this.getImageInfo(item));
    });  
    this.sclollContent.innerHTML = markup.join('');

   
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    let fmt = t => ('' + t).padStart(2, '0');
    let time = new Date(Date.parse(date));
    let yeat = time.getFullYear();
    const months = {1: "января", 2: "февраля", 3: "марта", 4: "апреля", 5: "мая", 6: "июня", 7: "июля", 8: "августа", 9: "сентября", 10: "октября", 11: "ноября", 12: "декабря"}
    let month = months[time.getMonth()]
    let dateNumb = time.getDate();
    let hour;
    if(time.getTimezoneOffset() !== 3) {
      hour = fmt(time.getHours() + time.getTimezoneOffset() / 60 + 3);
    };
    let minut = fmt(time.getMinutes());
    return `${dateNumb} ${month} ${yeat} г. в ${hour}:${minut}`;
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    return `<div class="image-preview-container">
    <img src=${item.preview} />
    <table class="ui celled table">
    <thead>
      <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
    </thead>
    <tbody>
      <tr><td>${item.name}</td><td>${this.formatDate(item.created)}</td><td>${(item.size / 1000).toFixed(2)} Кб</td></tr>
    </tbody>
    </table>
    <div class="buttons-wrapper">
      <button class="ui labeled icon red basic button delete" data-path=${item.path}>
        Удалить
        <i class="trash icon"></i>
      </button>
      <button class="ui labeled icon violet basic button download" data-file=${item.file}>
        Скачать
        <i class="download icon"></i>
      </button>
    </div>
  </div>`
  }
}
