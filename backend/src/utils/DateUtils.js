export default class DateUtils {
  static formatDateTime() {
    //ajusta para UTC-3 (horário de Brasília)
    return new Date().toISOString().slice(0, 19).replace("T", " ");
  }
}