/**
 * Created by ayatekapoetra on 11/5/17.
 */
import '../../loading.html';

Template.mentorjadwal.helpers({
    GetIdmentor: function(){
        var idmentor = Template.instance();
        return idmentor.data;
    },
    GetDataRouter: function(){
        const data = Session.get('mentorjadwal');
        var getdatarouter = (data === undefined);
        //console.log(data);
        return getdatarouter;

    },
    //subscription: function() {
    //    //var getDatamentorjadwal = Session.get('mentorjadwal');
    //    return Template.instance().mentorjadwal.ready();
    //},
    GetPaketMentor: function(idmentor, idpaketdtl){
        var idmentor = (Session.get('idmentorRouter_mentorjadwal'));
        var idpaketdtl = (Session.get('idpaketdtlRouter_mentorjadwal'));
        //console.log(idmentor, idpaketdtl);
        const sel = "SELECT " +
            "hexa_mentor.idmentor, " +
            "hexa_mentor.nm_mentor, " +
            "hexa_mentor.rating, " +
            "hexa_mentor.img_pic, " +
            "hexa_mentorpaket.jns_pddk, " +
            "hexa_mentorpaket.kategori, " +
            "hexa_mentorpaket.tipe_group, " +
            "hexa_mentorpaket.jenjang, " +
            "hexa_mentorpaket.kelas, " +
            "hexa_mentorpaket.materi, " +
            "hexa_mentorpaket.keterangan, " +
            "hexa_mentorpaket.stspaket, " +
            "hexa_mentorpaketdtl.idpaket, " +
            "hexa_mentorpaketdtl.idpaketdtl, " +
            "hexa_mentorpaketdtl.jum_frek, " +
            "hexa_mentorpaketdtl.stn_frek, " +
            "hexa_mentorpaketdtl.durasi_frek, " +
            "hexa_mentorpaketdtl.stn_durasi, " +
            "hexa_mentorpaketdtl.disc_paket, " +
            "hexa_mentorpaketdtl.harga_paket, " +
            "hexa_mentorpaketdtl.stspaketdtl " +
        "FROM hexa_mentorpaket " +
        "INNER JOIN hexa_mentorpaketdtl " +
        "ON hexa_mentorpaket.idpaket = hexa_mentorpaketdtl.idpaket " +
        "INNER JOIN " +
        "hexa_mentor " +
        "ON hexa_mentor.idmentor = hexa_mentorpaket.idmentor " +
            "WHERE " +
            "(hexa_mentorpaket.idmentor="+idmentor+")and" +
            "(hexa_mentorpaketdtl.idpaketdtl="+idpaketdtl+")";
        Meteor.call('reqData', {data:sel}, function(error, result){
            Session.set('MentorGetPaket', result);
            //console.log(result);
        });
        var MentorGetPaket = Session.get('MentorGetPaket');
        //console.log(MentorGetPaket);
        return MentorGetPaket;
    }
});


Template.mentorjadwal.onCreated(function() {

});

Template.mentorjadwal.onRendered(function(){
    //console.log(GetNewDataJadwalMentor());
    var jadwal = Session.get('mentorjadwal');
    var jadwalDict = new ReactiveDict(jadwal);
    var CekData = (jadwal === undefined);
    //console.log(jadwal);
    if(CekData){
        Meteor.setTimeout(function(){
            $('#calendar').fullCalendar({
                dayClick: function(date) {
                    $( '#add-edit-event-modal' ).modal( 'show' );
                    $('#tglklik').val(date.format());
                    //$(this).css('background-color', 'red');
                    //$.each(jadwal, function () {
                    //    $.each(this, function (name, value) {
                    //        console.log(name + '=' + value);
                    //    });
                    //});
                },
                eventClick: function(events){
                    $(this).css('border-color', 'black');
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
                //events: jadwal
                events: Session.get('mentorjadwal')
            });
        }, 1000);
    }else{
        $('#calendar').fullCalendar({
            dayClick: function(date) {
                $( '#add-edit-event-modal' ).modal( 'show' );
                $('#tglklik').val(date.format());
                //$(this).css('background-color', 'red');
                //$.each(jadwal, function () {
                //    $.each(this, function (name, value) {
                //        console.log(name + '=' + value);
                //    });
                //});
            },
            eventClick: function(events){
                $(this).css('border-color', 'black');
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
            //events: jadwal
            events: Session.get('mentorjadwal')
        });
    };

    $('#tglklik').datetimepicker();
    var mulaipukul = $('#mulai').datetimepicker({
        format:'HH:mm'
    });
    $('#mulai').on('dp.change', function(e){
        var durasi = $('#durasi').val();
        var mulaipukul = $(this).val();
        var jambelajar = (parseInt(mulaipukul.substr(0, 2)) * 60) + parseInt(mulaipukul.substr(3, 2));
        var totdurasi = parseInt(jambelajar) + parseInt(durasi);
        var jamselesai = parseInt(totdurasi / 60);
        var mod = parseInt(totdurasi % 60);
        if(mod!=0){
            $('#selesai').val(jamselesai+':'+mod);
            if(mod < 10){
                $('#selesai').val(jamselesai+':0'+mod);
            }
        }
        else{
            $('#selesai').val(jamselesai+':00');
        }
    });

});


Template.mentorjadwal.events({
    'click #reloaddata': function(){
        // Untuk Force Refresh data calendar
        window.location = window.location;
    },
    'click #booking': function(e){
        e.preventDefault();
        var sel = "INSERT INTO hexa_mentorjadwal (idmentor, tgl_available, jam_mulai, jam_selesai, idpaket,idpaketdtl, idcust, created_at) " +
            "VALUE(" +Session.get('idmentorRouter_mentorjadwal')+", " +
            "'"+$('#tglklik').val()+"', " +
            "'"+$('#mulai').val()+"', " +
            "'"+$('#selesai').val()+"', " +
            "'"+$('#idpaket').val()+"', " +
            "'"+Session.get('idpaketdtlRouter_mentorjadwal')+"', " +
            "'"+$('#nm_siswa').val()+"', " +
            "'"+moment().format('YYYY-MM-DD HH:mm:ss')+"')";
        Meteor.call('reqData', {data:sel}, function(error, result){
            alert('affectedRows :'+result.affectedRows+' success');
            //var Newjadwal = Session.get('getDatamentorjadwal');
            //$('#calendar').fullCalendar('removeEvents');
            //$('#calendar').fullCalendar('addEventSource', Newjadwal);
            //$('#calendar').fullCalendar('refetchEvents');
            window.location = window.location;
        });


    }

});
