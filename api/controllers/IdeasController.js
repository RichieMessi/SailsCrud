/**
 * IdeasController
 *
 * @description :: Server-side logic for managing ideas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: (req, res) => {
        Ideas.find({}).exec((err, ideas) => {
            if(err){
                res.send(500, {error: 'Failed to connect to the Database'})
            } else {
                res.view('list', {ideas: ideas})
            }
        })
    },

    add: (req, res) => {
        res.view('add')
    },
    
    create: (req, res) => {
        const title = req.body.title
        const body = req.body.body

        Ideas.create({title: title, body: body}).exec((err) => {
            if(err){
                res.send(500, {error: 'Database Error Occoured'})
            }

            res.redirect('/ideas/list')
        })
    },
    
    delete: (req, res) => {
        Ideas.destroy({id: req.params.id}).exec((err) => {
            if(err) {
                res.send(500, {error: 'Databse Error Occoured'})
            }
            res.redirect('/ideas/list')
        })
        return false
    },

    edit: (req, res) => {
        Ideas.findOne({id:req.params.id}).exec((err, idea) => {
            if(err) {
                res.send(500, {error: 'Databse Error Occoured'})
            }

            res.view('edit', {idea: idea})
        })
    },

    update: (req, res) => {
            const title = req.body.title
            const body = req.body.body
    
            Ideas.update({id: req.params.id}, {title: title, body: body}).exec((err) => {
                if(err){
                    res.send(500, {error: 'Database Error Occoured'})
                }
    
                res.redirect('/ideas/list')
            })
            return false
    }
};

