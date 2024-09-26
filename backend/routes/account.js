const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authMiddleware = require("../middleware.js");
const { Balance } = require("../db.js");
const zod = require("zod");
const cors=require("cors");
router.get("/balance", authMiddleware, function(req, res) {
    Balance.findOne({ user_id: req.user_id }).then(function(account_data) {
        res.json({ balance: account_data.balance });
    }).catch(err => {
        res.status(500).json({ message: 'Server error', error: err });
    });
});

router.post('/transfer', authMiddleware, (req, res) => {
    mongoose.startSession().then(session => {
        session.startTransaction();
        const transfer_schema = zod.object({
            to: zod.string(),
            amount: zod.number()
        });
        const value = transfer_schema.safeParse(req.body);

        if (value.success) {
            const to = req.body.to;
            const amount = req.body.amount;


                Balance.findOne({ user_id: req.user_id }).session(session).then(account => {
                    if (!account || account.balance < amount) {
                        return session.abortTransaction().then(() => {
                            res.status(400).json({ message: 'Insufficient balance' });
                        });
                    }

                    Balance.findOne({ user_id: to }).session(session).then(toAccount => {
                        if (!toAccount) {
                            return session.abortTransaction().then(() => {
                                res.status(400).json({ message: 'Invalid recipient account' });
                            });
                        }

                        Balance.updateOne({ user_id: req.user_id }, { $inc: { balance: -amount } }).session(session).then(() => {
                            Balance.updateOne({ user_id: to }, { $inc: { balance: amount } }).session(session).then(() => {
                                session.commitTransaction().then(() => {
                                    res.json({ message: 'Transfer successful' });
                                }).catch(err => {
                                    session.abortTransaction().then(() => {
                                        res.status(500).json({ message: 'Commit transaction error', error: err });
                                    });
                                });
                            }).catch(err => {
                                session.abortTransaction().then(() => {
                                    res.status(500).json({ message: 'Update recipient balance error', error: err });
                                });
                            });
                        }).catch(err => {
                            session.abortTransaction().then(() => {
                                res.status(500).json({ message: 'Update sender balance error', error: err });
                            });
                        });
                    }).catch(err => {
                        session.abortTransaction().then(() => {
                            res.status(500).json({ message: 'Find recipient account error', error: err });
                        });
                    });
                }).catch(err => {
                    session.abortTransaction().then(() => {
                        res.status(500).json({ message: 'Find sender account error', error: err });
                    });
                });
           
        } else {
            session.abortTransaction().then(() => {
                res.status(400).json({ message: 'Invalid input' });
            });
        }
    }).catch(err => {
        res.status(500).json({ message: 'Session start error', error: err });
    });
});

module.exports = router;
