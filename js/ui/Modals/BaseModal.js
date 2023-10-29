/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor( element ) {
    this.baseModal = element;
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    this.baseModal.modal('show');
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    this.baseModal.modal('hide');
  }
}