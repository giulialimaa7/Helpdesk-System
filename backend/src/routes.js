import express from 'express';

import SelectList from './utils/SelectLists.js'; 
import TokenService from './services/TokenService.js';

import UserController from './controllers/UserController.js';
import AuthController from './controllers/AuthController.js';
import TicketController from './controllers/TicketController.js';

const router = express.Router();

//LISTS
router.get("/users", UserController.selectUsers);
router.get("/states", SelectList.selectStates); 
router.get("/sectors", SelectList.selectSectors);
router.get("/problems", SelectList.selectProblems);

//AUTHENTICATION
router.post("/login", AuthController.login.bind(AuthController));
router.post("/request-password", AuthController.requestPassword.bind(AuthController));
router.post("/reset-password", AuthController.resetPassword.bind(AuthController));

//TOKEN
router.post("/validate-login-token", TokenService.validateLoginToken.bind(TokenService));
router.get("/validate-reset-token/:token", TokenService.validateResetToken.bind(TokenService));

//TI
//USER
router.post("/ticket/create", TicketController.openTicket.bind(TicketController));
router.get("/ticket/my-tickets", TicketController.getUserTickets.bind(TicketController));
router.get("/ticket/my-tickets-closed", TicketController.getUserClosedTickets.bind(TicketController));

//ADM
router.get("/ticket/open", TicketController.getTickets.bind(TicketController));
router.patch("/ticket/update-status", TicketController.updateStatusTicket.bind(TicketController));
router.get("/ticket/closed", TicketController.getClosedTickets.bind(TicketController));

router.post("/users/create", UserController.insertUser.bind(UserController));
router.patch("/users/update", UserController.updateUser.bind(UserController));
router.delete("/users/delete", UserController.deleteUser.bind(UserController));

export default router; 