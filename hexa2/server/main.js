import { Meteor } from 'meteor/meteor';
import mysql from 'promise-mysql';
import { dbconfig } from './setting';
import { mentor } from './SqlQuery';

Meteor.startup(function(){
    let connection;
        try {
            mysql.createConnection({
                host : '159.89.202.241',
                user : 'xxxxxxxxxxx',
                password : 'xxxxxx',
                database : 'xxxx'
            }).then(conn => {
                connection = conn;
            return connection.query('SELECT 1 + 1 AS Success_Connect');
            }).then(result => {
                console.log(result);
            });
        } catch(error) {
            throw new Meteor.Error('Ooops', "Access denied for user 'root'@'localhost' (using password: YES)");
            console.log(Meteor.Error);
            return error;
        } finally {
            if (connection && connection.end) connection.end();
        }

});

Meteor.methods({
    async getMentors() {
        let connection;
        try {
            connection = await mysql.createConnection(dbconfig);
            const result = await connection.query(mentor);
            return result;
        } catch(error) {
            //throw new Meteor.Error('Ooops', "Access denied for user 'root'@'localhost' (using password: YES)");
            throw new Meteor.Error('OOPS', 'Someting wrong..');
            return error;
        } finally {
        if (connection && connection.end) await connection.end(); // Let's be nice and close the connection
        }
    },

    async getMentorsdetails(idmentor){
        let connection;
        var idmentor = idmentor;
        const que = "SELECT * from hexa_mentor WHERE idmentor=" +idmentor.data;
        try {
            connection = await mysql.createConnection(dbconfig);
            const result = await connection.query(que);
            return result;
        } catch(error) {
            throw new Meteor.Error('oops', 'something bad happened');
        } finally {
            if (connection && connection.end)
                await connection.end();
        }
    },

    async getMentorspaket(idmentor){
        let connection;
        var idmentor = idmentor;
        //const que = "SELECT * from hexa_mentorpaket WHERE (idmentor=" +idmentor.data+")and(stspaket=1) ";
        const que = "SELECT "+
            "hexa_mentorpaket.idmentor, "+
            "hexa_mentorpaket.jns_pddk, "+
            "hexa_mentorpaket.kategori, "+
            "hexa_mentorpaket.tipe_group, "+
            "hexa_mentorpaket.jenjang, "+
            "hexa_mentorpaket.kelas, "+
            "hexa_mentorpaket.materi, "+
            "hexa_mentorpaket.keterangan, "+
            "hexa_mentorpaketdtl.idpaketdtl, "+
            "hexa_mentorpaketdtl.jum_frek, "+
            "hexa_mentorpaketdtl.durasi_frek, "+
            "hexa_mentorpaketdtl.stn_durasi, "+
            "hexa_mentorpaketdtl.disc_paket, "+
            "hexa_mentorpaketdtl.harga_paket "+
            "FROM hexa_mentorpaket "+
            "INNER JOIN "+
            "hexa_mentorpaketdtl "+
            "ON hexa_mentorpaket.idpaket = hexa_mentorpaketdtl.idpaket "+
            "WHERE (stspaket =1)and(idmentor ="+idmentor.data+")";
        try {
            connection = await mysql.createConnection(dbconfig);
            const result = await connection.query(que);
            return result;
        } catch(error) {
            throw new Meteor.Error('oops', 'something bad happened');
        } finally {
            if (connection && connection.end)
                await connection.end();
        }
    },

    async getMentorsTemplate(idmentor){
        let connection;
        var idmentor = idmentor;
        const que = "SELECT * from hexa_mentor WHERE idmentor=" +idmentor.data;
        try {
            connection = await mysql.createConnection(dbconfig);
            const result = await connection.query(que);
            return result;
        } catch(error) {
            throw new Meteor.Error('oops', 'something bad happened');
        } finally {
            if (connection && connection.end)
                await connection.end();
        }
    },

    async reqData(sel){
        var que = sel.data;
        const connection = await mysql.createConnection(dbconfig);
        const rows = await connection.query(que);
        connection.end();
        //console.log(que);
        return rows;
    }
});
