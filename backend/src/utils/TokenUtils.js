export default class TokenUtils {
  static isTokenExpired(createdAt, expirationHours = 1) {
    const now = new Date();
    const created = new Date(createdAt);
    const expirationTime = expirationHours * 60 * 60 * 1000;
    
    return now - created > expirationTime;
  }
}