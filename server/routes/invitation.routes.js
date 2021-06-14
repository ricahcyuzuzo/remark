import Router from 'express';
import InvitationController from '../controllers/invitation.controller';

const routes = Router();

routes.post('/invite', InvitationController.sendInvitation);
routes.get('/invites', InvitationController.getAllInvites);
routes.get('/oneinvite', InvitationController.getOneInvite);
routes.patch('/acceptinvite', InvitationController.acceptInvite);
routes.patch('/denyinvite', InvitationController.denyInvite);
routes.get('/users', InvitationController.viewAllUsers);
routes.get('/user', InvitationController.viewOneUser);
routes.patch('/changetime', InvitationController.suggestDateAndTime);

export default routes;
