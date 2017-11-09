/**
 * Created by ayatekapoetra on 10/23/17.
 */

Router.configure({
    layoutTemplate: 'mainapp'
});

Router.route('/',
    function () {
        this.render('landingpage_header', {
            to: "header"
        });
        this.render('landingpage_content', {
            to: "content"
        });
        this.render('landingpage_footer', {
            to: "footer"
        });
    },
    {
        name : 'home'
    }
);

Router.route('/about', function () {
    this.render('landingpage_header', {
        to: "header"
    });
    this.render('about', {
        to: "content"
    });
    this.render('landingpage_footer', {
        to: "footer"
    });
}, {name : 'about'});

Router.route('/service', function () {
    this.render('landingpage_header', {
        to: "header"
    });
    this.render('service', {
        to: "content"
    });
    this.render('landingpage_footer', {
        to: "footer"
    });
}, {name : 'service'});

Router.route('/login', function () {
    this.render('', {
        to: ""
    });
    this.render('login', {
        to: "content"
    });
    this.render('footer', {
        to: ""
    });
});

Router.route('/mentor/:idmentor', function () {
    this.render('landingpage_header', {
        to: "header"
    });
    this.render('mentordetails', {
        to: "content",
        data: function(){
            var idmentor = this.params.idmentor;
            Meteor.call('getMentorsdetails', {data:idmentor}, function(error, result){
                Session.set('listdata', result);
                var data = Session.get('listdata');
            });
            Session.get('listdata');
            return Session.get('listdata');
        }
    });
    this.render('landingpage_footer', {
        to: "footer"
    });
});

Router.route('/mentorpaket/:idmentor', function () {
    this.render('landingpage_header', {
        to: "header"
    });
    //this.render('mentorpaket', {
    this.render('mentorpaketdetail', {
        to: "content",
        data: function(){
            var idmentor = this.params.idmentor;
            Meteor.call('getMentorspaket', {data:idmentor}, function(error, result){
                Session.set('listdatapaket', result);
                var data = Session.get('listdatapaket');
            });
            Session.get('listdatapaket');
            //console.log(Session.get('listdatapaket'));
            return Session.get('listdatapaket');
        }
    });
    this.render('landingpage_footer', {
        to: "footer"
    });
});

Router.route('/mentorjadwal/:idmentor/paketdetails/:paketdtl', function () {
    this.render('mentorjadwal', {
        to: "content",
        data: function(){
            var idmentor = this.params.idmentor;
            var idpaketdtl = this.params.paketdtl;
            Session.set('idmentorRouter_mentorjadwal', idmentor);
            Session.set('idpaketdtlRouter_mentorjadwal', idpaketdtl);
            const sel = "SELECT *," +
                "CONCAT(materi,' ',jenjang, ' ', kelas) as title, " +
                "CONCAT(tgl_available, ' ', jam_mulai) as start, " +
                "CONCAT(tgl_available, ' ', jam_selesai) as end " +
                "from v_jadwalpaket " +
                "WHERE (sts_available=1)and(idmentor = "+idmentor+") ";
            Meteor.call('reqData', {data:sel}, function(error, result){
                Session.set('mentorjadwal', result);
            });
            var mentorjadwal = Session.get('mentorjadwal');
            //console.log((mentorjadwal));
            //console.log('router '+idmentor, idpaketdtl);
            return Session.get('mentorjadwal');
        }
    });
    this.render('landingpage_header', {
        to: "header"
    });
    this.render('landingpage_footer', {
        to: "footer"
    });
});

Router.route('/mentorlist', function () {
    this.render('mentorlist', {
        to: "content",
        //data: function(){
        //    var idmentor = this.params.idmentor;
        //    var idpaketdtl = this.params.paketdtl;
        //    Session.set('idmentorRouter_mentorjadwal', idmentor);
        //    Session.set('idpaketdtlRouter_mentorjadwal', idpaketdtl);
        //    const sel = "SELECT *," +
        //        "CONCAT(materi,' ',jenjang, ' ', kelas) as title, " +
        //        "CONCAT(tgl_available, ' ', jam_mulai) as start, " +
        //        "CONCAT(tgl_available, ' ', jam_selesai) as end " +
        //        "from v_jadwalpaket " +
        //        "WHERE (sts_available=1)and(idmentor = "+idmentor+") ";
        //    Meteor.call('reqData', {data:sel}, function(error, result){
        //        Session.set('mentorjadwal', result);
        //    });
        //    var mentorjadwal = Session.get('mentorjadwal');
        //    //console.log((mentorjadwal));
        //    //console.log('router '+idmentor, idpaketdtl);
        //    return Session.get('mentorjadwal');
        //}
    });
    this.render('landingpage_header', {
        to: "header"
    });
    this.render('landingpage_footer', {
        to: "footer"
    });
});

