/**
 * Created by ayatekapoetra on 11/1/17.
 */
Template.mentorlist.helpers({
    MentorList : function(){
        var sel = "select * from hexa_mentor where stsmentor != 0";
        Meteor.call('reqData', {data:sel}, function(error, result){
            Session.set('mentorlist', result);
        });
        var mentorlist = Session.get('mentorlist');
        return mentorlist;
    },

    subscription: function() {
        return Template.instance().mentorlist.ready();
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

Template.mentorlist.onCreated( function() {
    //console.log('create template...');
    this.mentorlist = this.subscribe( 'mentorlist' );
    console.log(this.mentorlist);
});