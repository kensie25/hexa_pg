import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './css/style.css';
import './css/slider.css';
import './js/owl.carousel.js';
import './js/modernizr.custom.28468.js';


//Template.hello.onCreated(function helloOnCreated() {
//  // counter starts at 0
//
//
//    $('#da-slider').cslider({
//      autoplay : true,
//      bgincrement : 450
//    });
//
//    $("#owl-demo").owlCarousel({
//      items : 4,
//      lazyLoad : true,
//      autoPlay : true,
//      navigation : true,
//      navigationText : ["", ""],
//      rewindNav : false,
//      scrollPerPage : false,
//      pagination : false,
//      paginationNumbers : false,
//    });
//
//});
//
//Template.hello.helpers({
//  counter() {
//    return Template.instance().counter.get();
//  },
//});
//
//Template.hello.events({
//  'click button'(event, instance) {
//    // increment the counter when button is clicked
//    instance.counter.set(instance.counter.get() + 1);
//  },
//});
