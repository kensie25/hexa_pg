/**
 * Created by ayatekapoetra on 11/2/17.
 */
import "./mentorpaketdetails.css";

Template.mentorpaketdetail.onRendered( function() {
    console.log('Render template...');
    //this.datapaket = this.subscribe( 'datapaket' );
    //console.log(this.datapaket);
});

Template.mentorpaketdetail.onCreated( function() {
    //console.log('create template...');
    this.datapaket = this.subscribe( 'datapaket' );
    //console.log(this.datapaket);
});

Template.mentorpaketdetail.helpers({
    datapaket : function(){
        var idmentor = Template.instance();
        //console.log(idmentor.data.length);
        return idmentor.data;
        //if(idmentor.data.length != 0){
        //    return idmentor.data;
        //}else{
        //    return idmentor.data;
        //}

    },
    isDataPaket : function(){
        var idmentor = Template.instance();
        return (idmentor.data.length === 0 );
    },

    subscription: function() {
        return Template.instance().mentorpaketdetail.ready();
    },

    //'mentorPaketDetails' : function(){
    //    var data = Template.instance();
    //    var idpaket = data.data[0].idpaket;
    //    var sel = "SELECT * from hexa_mentorpaketdtl WHERE (idpaket="+idpaket+")and(stspaketdtl=1) group by idpaketdtl desc";
    //    Meteor.call('reqData', {data:sel}, function(error, result){
    //        Session.set('mentorpaketdtl', result);
    //        var data = Session.get('mentorpaketdtl');
    //
    //    });
    //    var mentorpaketdtl = Session.get('mentorpaketdtl');
    //    //console.log(nilai);
    //    return mentorpaketdtl;
    //},
});