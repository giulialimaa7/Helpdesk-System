import Estados from '../models/states.js';
import Setor from '../models/sectors.js';
import Problemas from '../models/problems.js';

export default class SelectLists {
  static async selectStates(req, res) {
    try {
      const estados = await Estados.findAll();
      return res.json({ estados });  
    } 
    catch (error) {
      throw new Error("Erro ao buscar estados!");
    }
  }

  static async selectSectors(req, res) {
    try {
      const setores = await Setor.findAll();
      return res.json({ setores });  
    } 
    catch (error) {
      throw new Error("Erro ao buscar setores!");
    }
  }

  static async selectProblems(req, res) {
    try {
      const problemas = await Problemas.findAll();
      return res.json({ problemas });  
    } 
    catch (error) {
      throw new Error("Erro ao buscar problemas!");
    }
  }
}