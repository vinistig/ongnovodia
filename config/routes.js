/**
 * ROUTES
 * All app routes live in here. Ike will automatically
 * add new routes to the end of this file.
 */
const express           = require('express')
const routes            = require('ike-router')(`${__dirname}/../app/controllers/`)

const loginMiddleware   = require('ibm-ldap')
const sessionMiddleware = apprequire('helpers/session-middleware.helper')

const multer = require('multer')()

/* ####################
   ###### generic #####
   #################### */
routes.get('/api/status', 'status#index')


/* ####################
   ###### mobile ######
   #################### */
routes.post('/api/login', 'login#login')
routes.post('/api/inscricao', 'inscricao#new')
routes.get   ('/api/inscricao/:documento', 'inscricao#get')
routes.put   ('/api/inscricao/:documento', 'inscricao#edit')
routes.delete('/api/inscricao/:documento', 'inscricao#delete')

module.exports = routes.draw();
