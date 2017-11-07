/**
 * Created by ayatekapoetra on 11/1/17.
 */
Template.mentorpaket.helpers({
    'datapaket' : function(){
        var idmentor = Template.instance();
        console.log(idmentor);
        return idmentor.data;
    },

    'mentorPaketDetails' : function(){
        var data = Template.instance();
        var idpaket = data.data[0].idpaket;
        var sel = "SELECT * from hexa_mentorpaketdtl WHERE (idpaket="+idpaket+")and(stspaketdtl=1) group by idpaketdtl desc";
        Meteor.call('reqData', {data:sel}, function(error, result){
            Session.set('mentorpaketdtl', result);
            var data = Session.get('mentorpaketdtl');

        });
        var mentorpaketdtl = Session.get('mentorpaketdtl');
        //console.log(nilai);
        return mentorpaketdtl;
    },
});