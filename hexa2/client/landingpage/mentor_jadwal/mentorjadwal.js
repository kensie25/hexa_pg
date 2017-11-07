/**
 * Created by ayatekapoetra on 11/5/17.
 */

Template.mentorjadwal.helpers({

});


Template.mentorjadwal.onCreated(function() {
    var idmentor = Template.instance();
    console.log(idmentor.data);
    //Tracker.autorun(function(){
    //    const sel = "SELECT idmentor, " +
    //    "CONCAT(materi,' ',jenjang, ' ', kelas) as title, " +
    //    "CONCAT(tgl_available, ' ', jam_mulai) as start, " +
    //    "CONCAT(tgl_available, ' ', jam_selesai) as end " +
    //    "from v_jadwalpaket WHERE (sts_available=1)and(idmentor = 1)";
    //    Meteor.call('reqData', {data:sel}, function(error, result){
    //        Session.set('mentorjadwal', result);
    //        var data = Session.get('mentorjadwal');
    //        console.log(data);
    //    });
    //    var mentorjadwal = Session.get('mentorjadwal');
    //    return Session.get('mentorjadwal');
    //});

});

Template.mentorjadwal.onRendered(function(){
    var jadwal = Session.get('mentorjadwal');
    if(jadwal === undefined){
        $('#calendar').fullCalendar({
            header: {
                left:   'title',
                center: 'xxx', // buttons for switching between views
                right:  'month,agendaWeek,agendaDay,prev,next'

            },
            dayClick: function(date){
                $( '#add-edit-event-modal' ).modal( 'show' );
                $('#add-edit-event').html(date.format());
                $('#reloaddata').click();
            },
            events: jadwal
        });
        //$('#loading').show();
        Meteor.setTimeout(function(){
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar').fullCalendar('addEventSource', jadwal);
            $('#calendar').fullCalendar('refetchEvents');
        }, 3000);
    }else{
        $('#calendar').fullCalendar({
            dayClick: function(date) {
                $( '#add-edit-event-modal' ).modal( 'show' );
                $('#add-edit-event').html(date.format());
                //$(this).css('background-color', 'red');
                //$.each(jadwal, function () {
                //    $.each(this, function (name, value) {
                //        console.log(name + '=' + value);
                //    });
                //});
            },
            eventClick: function(events){
                $(this).css('border-color', 'red');
                $('#view-event-modal').modal( 'show' );
                $('#title-modal-event').html(events.title);
                $('#input-start').val(moment(events.start).format('LLLL'));
                $('#input-end').val(moment(events.end).format('LLLL'));
            },
            header: {
                left:   'title',
                center: '',
                right:  'month,agendaWeek,agendaDay,prev,next'

            },
            events: jadwal
        });
    }
});


Template.mentorjadwal.events({
    'click #reloaddata': function(){
        var jadwal = Session.get('mentorjadwal');
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', jadwal);
        $('#calendar').fullCalendar('refetchEvents');
    },

});