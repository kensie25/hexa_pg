/**
 * Created by ayatekapoetra on 10/20/17.
 */



//import '../../../css/style.css';
//import '../css/slider.css';
//import '../js/owl.carousel.js';
//import '../js/modernizr.custom.28468.js';
//import '../fonts/css/font-awesome.min.css';

Template.landingpage_content.helpers({
    'datamentor' : function(){
        Meteor.call('getMentors', function(error, result){
            if (!error){
                Session.set('listdata', result);
                var data = Session.get('listdata');
            }else {
                Session.set('listdata', error);
                var data = Session.get('listdata');
                alert(data.message);
            }

        });
        var nilai = Session.get('listdata');
        //console.log(nilai);
        return nilai;
    },

    'datamentor_next' : function(){
        var sel = "select * from hexa_mentor where stsmentor = 1 limit 4,4";
        Meteor.call('reqData', {data:sel}, function(error, result){
            if (!error){
                Session.set('datamentor_next', result);
                var data = Session.get('listddatamentor_nextata');
            }else {
                Session.set('datamentor_next', error);
                var data = Session.get('datamentor_next');
                alert(data.message);
            }

        });
        var datamentor_next = Session.get('datamentor_next');
        //console.log(datamentor_next);
        return datamentor_next;
    }
});