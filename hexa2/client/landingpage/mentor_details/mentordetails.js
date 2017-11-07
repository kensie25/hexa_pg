/**
 * Created by ayatekapoetra on 10/26/17.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './mentordetails.css';
import '../../js/jquery-ui.js';
import '../../js/jquery-ui.css';


Template.mentordetails.rendered= function(){
    $(".expand").on( "click", function() {
        // $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
    console.log('render...');
}

Template.mentordetails.helpers({
    'idmentor' : function(){
        var idmentor = Template.instance();
        //console.log(idmentor);
        return idmentor.data[0];
    },

    'CustomDate' : function(){
        var date = Template.instance().data[0].created_date;
        //var formatdate = moment(new Date(idmentor.created_date)).format("MMMM, D YYYY");
        var formatdate = moment(new Date(date)).fromNow();
        return formatdate;
    },

    'mentorBahasa' : function(){
        var data = Template.instance();
        var idmentor = data.data[0].idmentor;
        var sel = "SELECT * from hexa_mentorbahasa WHERE idmentor="+idmentor;
        Meteor.call('reqData', {data:sel}, function(error, result){
            Session.set('mentorbahasa', result);
            var data = Session.get('mentorbahasa');

        });
        var bahasa = Session.get('mentorbahasa');
        //console.log(nilai);
        return bahasa;
    },

    'mentorPend' : function(){
        var data = Template.instance();
        var idmentor = data.data[0].idmentor;
        var sel = "SELECT * from hexa_mentorpend WHERE (sts_pend = 1 and idmentor="+idmentor+")";
        Meteor.call('reqData', {data:sel}, function(error, result){
            Session.set('mentorpddk', result);
            var data = Session.get('mentorpddk');

        });
        var pendidikan = Session.get('mentorpddk');
        //console.log(pendidikan);
        return pendidikan;
    },

    'prettifyDateMulai' : function(mulai_pend){
        //return moment(new Date(mulai_pend)).fromNow();
        return moment(new Date(mulai_pend)).format("YYYY");
    },

    'prettifyDateSelesai' : function(selesai_pend){
        //return moment(new Date(selesai_pend)).fromNow();
        return moment(new Date(selesai_pend)).format("YYYY");
    },

    'mentorPrestasi' : function(){
        var data = Template.instance();
        var idmentor = data.data[0].idmentor;
        var sel = "SELECT * from hexa_mentorprestasi WHERE (sts_prestasi = 1 and idmentor="+idmentor+")";
        Meteor.call('reqData', {data:sel}, function(error, result){
            Session.set('mentorprestasi', result);
            var data = Session.get('mentorprestasi');

        });
        var prestasi = Session.get('mentorprestasi');
        //console.log(prestasi);
        return prestasi;

    },

    isValue : function(){
        var prestasi = Session.get('mentorprestasi');
        console.log(prestasi);
        return (prestasi.length === 0 );

    }


});


Template.mentordetails.events({
  'click #btn_test': function(e) {
      e.preventDefault();
      alert('ok');
  },
});
