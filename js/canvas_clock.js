<script src="\assets\js\APlayer.min.js"> </script>/*
* Name: canvas_clock.js
* Author: Michael Kruger
* Brief:
*
* This is a canvas based library with 15 different clocks that can be embedded in webpages. 
* For more info please visit: www.krugaroo.com#canvasClock
*
* Copyright 2016 Krugaroo
* More Info: www.krugaroo.com#canvasClock
*
* License: MIT License
*
* Copyright (c) 2016 Michael Kruger, Krugaroo
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

day_arr=["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
month_arr=["January","February","March","April","May","June","July","August","September","October","November","December"];

function clock_conti(size, cns, clockd)
{
  cns.clearRect(0,0,size,size);

  cns.beginPath();
  if(clockd.hasOwnProperty("bg_color")){cns.fillStyle=clockd["bg_color"];}else{cns.fillStyle="#ffffff";}
  cns.rect(0,0,size,size);
  cns.fill();
  cns.closePath();
  if(clockd.hasOwnProperty("bgLoaded") && clockd.bgLoaded==1){if(clockd.hasOwnProperty("bg_opacity")){cns.globalAlpha=clockd["bg_opacity"];cns.drawImage(clockd.bgImage,0,0,size,size);cns.globalAlpha=1;}}

  if((clockd.hasOwnProperty("indicate") && clockd.indicate==true) || !clockd.hasOwnProperty("indicate"))
  {
  indicator(size, cns, clockd);
  }

  if(clockd.hasOwnProperty("time_add") && clockd.time_add)
  {
  time_add((size/2),size/5*3, size, cns, clockd);
  }

  if(clockd.hasOwnProperty("date_add") && clockd.date_add)
  {
  date_add((size/2),size/5*3+size/10, size, cns, clockd);
  }

  var now=new Date();
  var time_off=(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;
  now.setTime(now.getTime()+time_off*1000);
  var milisec=now.getMilliseconds();
  var sec=now.getSeconds();
  var min=now.getMinutes();
  var hour=now.getHours()%12;
  
  cns.fillStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
  cns.strokeStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
  cns.lineCap="round";

  cns.beginPath();
  cns.lineWidth=1;
  cns.moveTo((size/2),(size/2));
  cns.arc((size/2),(size/2),size/3,-1.57+sec*0.1046+milisec/1000*0.1046,-1.569+sec*0.1046+milisec/1000*0.1046,0);
  cns.stroke();
  cns.closePath();

  cns.beginPath();
  cns.lineWidth=1;
  cns.moveTo((size/2),(size/2));
  cns.arc((size/2),(size/2),size/15,1.57+sec*0.1046+milisec/1000*0.1046,1.569+sec*0.1046+milisec/1000*0.1046,1);
  cns.stroke();
  cns.closePath();

  cns.fillStyle=(clockd.hasOwnProperty("dial2_color"))?clockd["dial2_color"]:"#333333";
  cns.strokeStyle=(clockd.hasOwnProperty("dial2_color"))?clockd["dial2_color"]:"#333333";
  cns.lineCap="round";

  cns.beginPath();
  cns.lineWidth=2;
  cns.moveTo((size/2),(size/2));
  cns.arc((size/2),(size/2),size/3,-1.57+min*0.1046+sec/60*0.1046,-1.569+min*0.1046+sec/60*0.1046,0);
  cns.stroke();
  cns.closePath();

  cns.fillStyle=(clockd.hasOwnProperty("dial3_color"))?clockd["dial3_color"]:"#333333";
  cns.strokeStyle=(clockd.hasOwnProperty("dial3_color"))?clockd["dial3_color"]:"#333333";
  cns.lineCap="round";

  cns.beginPath();
  cns.lineWidth=3;
  cns.moveTo((size/2),(size/2));
  cns.arc((size/2),(size/2),size/4,-1.57+hour*0.523+min/60*0.523,-1.569+hour*0.523+min/60*0.523,0);
  cns.stroke();
  cns.closePath();

  cns.fillStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
  cns.strokeStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
  cns.lineCap="round";

  cns.beginPath();
  cns.lineWidth=2;
  cns.arc((size/2),(size/2),size/80,0,6.28,0);
  cns.fill();
  cns.closePath();

  clockd.timer=setTimeout(function(){clock_conti(size, cns, clockd)},50);
}

function clock_digital(size, cns, clockd)
{
  var now=new Date();
  var time_off=(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;
  now.setTime(now.getTime()+time_off*1000);
  var milisec=now.getMilliseconds();
  var sec=now.getSeconds();
  var min=now.getMinutes();
  var hour=now.getHours();

  cns.clearRect(0,0,size,size);

  cns.beginPath();
  if(clockd.hasOwnProperty("bg_color")){cns.fillStyle=clockd["bg_color"];}else{cns.fillStyle="#ffffff";}
  cns.rect(0,0,size,size);
  cns.fill();
  cns.closePath();
  if(clockd.hasOwnProperty("bgLoaded") && clockd.bgLoaded==1){if(clockd.hasOwnProperty("bg_opacity")){cns.globalAlpha=clockd["bg_opacity"];cns.drawImage(clockd.bgImage,0,0,size,size);cns.globalAlpha=1;}}

  if(hour<10){hour="0"+hour;} if(min<10){min="0" +min;}="" if(sec<10){sec="0" +sec;}="" cns.fillstyle="(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333";" cns.textbaseline="middle" ;="" cns.textalign="center" cns.font="size/8+"px" arial";="" cns.filltext(hour+":"+min+":"+sec,(size="" 2),size="" 2.5);="" if(clockd.hasownproperty("date_add")="" &&="" clockd.date_add)="" {="" date_add((size="" 5*3+size="" 10,size,cns,="" clockd);="" }="" clockd.timer="setTimeout(function(){clock_digital(size," cns,="" clockd)},50);="" function="" clock_reverse(size,="" clockd)="" cns.clearrect(0,0,size,size);="" cns.beginpath();="" if(clockd.hasownproperty("bg_color")){cns.fillstyle="clockd["bg_color"];}else{cns.fillStyle="#ffffff";}" cns.rect(0,0,size,size);="" cns.fill();="" cns.closepath();="" if(clockd.hasownproperty("bgloaded")="" clockd.bgloaded="=1){if(clockd.hasOwnProperty("bg_opacity")){cns.globalAlpha=clockd["bg_opacity"];cns.drawImage(clockd.bgImage,0,0,size,size);cns.globalAlpha=1;}}" if((clockd.hasownproperty("indicate")="" clockd.indicate="=true)" ||="" !clockd.hasownproperty("indicate"))="" indicator(size,="" if(clockd.hasownproperty("time_add")="" clockd.time_add)="" time_add((size="" 5*3,="" size,="" 10,="" var="" now="new" date();="" time_off="(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;" now.settime(now.gettime()+time_off*1000);="" milisec="now.getMilliseconds();" sec="now.getSeconds();" min="now.getMinutes();" hour="now.getHours()%12;" cns.strokestyle="(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";" cns.linecap="round" cns.linewidth="1;" cns.moveto((size="" 2),(size="" 2));="" cns.arc((size="" 3,-1.57-sec*0.1046,-1.569-sec*0.1046,0);="" cns.stroke();="" 15,1.57-sec*0.1046,1.569-sec*0.1046,1);="" 3,-1.57-min*0.1046,-1.569-min*0.1046,0);="" 4,-1.57-hour*0.523-min="" 60*0.523,-1.569-hour*0.523-min="" 60*0.523,0);="" 80,0,6.28,0);="" clock_norm(size,="" br="[60,120,180];" r2="[10,20,30];" r3="[40,80,120];" r4="[4,5,7];" 3,-1.57+sec*0.1046,-1.569+sec*0.1046,0);="" 15,1.57+sec*0.1046,1.569+sec*0.1046,1);="" 3,-1.57+min*0.1046,-1.569+min*0.1046,0);="" 4,-1.57+hour*0.523+min="" 60*0.523,-1.569+hour*0.523+min="" 60,0,6.28,0);="" clock_follow(size,="" 3,-1.57,-1.569+sec*0.1046+milisec="" 1000*0.1046,0);="" cns.lineto((size="" 17,1.57+sec*0.1046+milisec="" 1000*0.1046,1.569+sec*0.1046+milisec="" 1000*0.1046,1);="" 3.5,-1.57,-1.569+min*0.1046+sec="" 60*0.1046,0);="" 4.5,-1.57,-1.569+hour*0.523+min="" 15,="" clock_circles(size,="" 6*3,="" 6*3+size="" clock_grow(size,="" 2),sec*size="" 200+size="" 15,-1.57+sec*0.1046+milisec="" 1000*0.1046,-1.569+sec*0.1046+milisec="" 2),min*size="" 200+sec="" 60*size="" 15,-1.57+min*0.1046+sec="" 60*0.1046,-1.569+min*0.1046+sec="" 2),hour*size="" 200*3+min="" 200*3+size="" 15,-1.57+hour*0.523+min="" clock_dots(size,="" for(var="" a="0;a<(sec+1);a++)" r="parseInt(a)*0.1046;" calc="Math.cos(r-1.57)*(size/2.8);" y="Math.sin(r-1.57)*(size/2.8);" cns.arc(calc+(size="" 2),y+(size="" 100,0,6.28,0);="" clock_num(size,="" 3.2,-1.57+sec*0.1046+milisec="" cns.filltext(sec,math.cos(-1.57+sec*0.1046+milisec="" 1000*0.1046)*size="" 3+(size="" 2),math.sin(-1.57+sec*0.1046+milisec="" 2))="" 15,1.57+sec*0.1046+milisec="" 3.2,-1.57+min*0.1046+sec="" cns.filltext(min,math.cos(-1.57+min*0.1046+sec="" 60*0.1046)*size="" 2),math.sin(-1.57+min*0.1046+sec="" if(hour="=0){var" hour2="12;}else{var" cns.filltext(hour2,math.cos(-1.57+hour*0.523+min="" 60*0.523)*size="" 3.5+(size="" 2),math.sin(-1.57+hour*0.523+min="" clock_random(size,="" if(!clockd.hasownproperty("track")){clockd["track"]="20;}" clockd["track"]="parseInt(clockd["track"])+1;" if(parseint(clockd["track"])="">=20)
  {
    cns.clearRect(0,0,size,size);

    cns.beginPath();
    if(clockd.hasOwnProperty("bg_color")){cns.fillStyle=clockd["bg_color"];}else{cns.fillStyle="#ffffff";}
    cns.rect(0,0,size,size);
    cns.fill();
    cns.closePath();
    if(clockd.hasOwnProperty("bgLoaded") && clockd.bgLoaded==1){if(clockd.hasOwnProperty("bg_opacity")){cns.globalAlpha=clockd["bg_opacity"];cns.drawImage(clockd.bgImage,0,0,size,size);cns.globalAlpha=1;}}

    if(clockd.hasOwnProperty("date_add") && clockd.date_add)
    {
      date_add((size/2),size/5*3+size/10, size, cns, clockd);
    }

    var hourx=Math.floor(Math.random()*size/1.5)+Math.floor((size/2)/10);
    var houry=Math.floor(Math.random()*size/1.5)+Math.floor((size/2)/10);

    cns.fillStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
    cns.strokeStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
    //if(hour==0){hour=12;}else{hour=hour;}
    if(hour<10){hour="0"+hour;} if(min<10){min="0" +min;}="" if(sec<10){sec="0" +sec;}="" cns.textbaseline="middle" ;="" cns.textalign="left" cns.font="(size/15)+"pt" arial";="" cns.filltext(hour+":"+min+":"+sec,hourx,houry);="" clockd["track"]="0;" }="" clockd.timer="setTimeout(function(){clock_random(size," cns,="" clockd)},50);="" function="" clock_digitalran(size,="" clockd)="" {="" var="" now="new" date();="" time_off="(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;" now.settime(now.gettime()+time_off*1000);="" sec="now.getSeconds();" min="now.getMinutes();" hour="now.getHours();" hexarr="new" array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");="" a="Math.floor(Math.random()*16);" b="Math.floor(Math.random()*16);" c="Math.floor(Math.random()*16);" d="Math.floor(Math.random()*16);" e="Math.floor(Math.random()*16);" f="Math.floor(Math.random()*16);" if(clockd.hasownproperty("track"))="" clockd["track"]+="1;" else="" if(parseint(clockd["track"])="=20)" cns.clearrect(0,0,size,size);="" cns.beginpath();="" if(clockd.hasownproperty("bg_color")){cns.fillstyle="clockd["bg_color"];}else{cns.fillStyle="#ffffff";}" cns.rect(0,0,size,size);="" cns.fill();="" cns.closepath();="" if(clockd.hasownproperty("bgloaded")="" &&="" clockd.bgloaded="=1){if(clockd.hasOwnProperty("bg_opacity")){cns.globalAlpha=clockd["bg_opacity"];cns.drawImage(clockd.bgImage,0,0,size,size);cns.globalAlpha=1;}}" if(clockd.hasownproperty("date_add")="" clockd.date_add)="" date_add((size="" 2),size="" 3*2,="" size,="" clockd);="" if(hour="=0){var" hour2="12;}else{var" if(hour<10){hour="0" +hour;}="" cns.strokestyle="#333333" cns.fillstyle="#" +hexarr[a]+hexarr[b]+hexarr[c]+hexarr[d]+hexarr[e]+hexarr[f];="" cns.filltext(hour2+":"+min+":"+sec,(size="" 2.5);="" clock_bars(size,="" mili="now.getMilliseconds();" if((clockd.hasownproperty("indicate")="" clockd.indicate="=true)" ||="" !clockd.hasownproperty("indicate"))="" for(var="" if(a%3="=0){cns.lineWidth=2;}else{cns.lineWidth=1;}" cns.moveto(size="" 7+size="" 7.1,size="" 8+a*size="" 1.3="" 12);="" cns.lineto(size="" 2.38,size="" cns.stroke();="" 2.35+size="" 1.45,size="" 7.1*1.5,size="" 8);="" 8+size="" 1.3);="" 2.38+size="" if(clockd.hasownproperty("time_add")="" clockd.time_add)="" time_add((size="" 20,="" 14*13,="" cns.linecap="round" cns.rect(size="" 7.4,size="" 8,size="" 6.8,size="" 1.3-(size="" 1.3)*(hour*60+min)="" 720,size="" 6.8,(size="" 720);="" cns.fill()="" cns.beginpath()="" 1.3)*(min*60+sec)="" 3600,size="" 3600);="" 1.3)*(sec*1000+mili)="" 60000,size="" 60000);="" clock_planets(size,="" indicator(size,="" 5*3,="" 5*3+size="" 10,="" milisec="now.getMilliseconds();" if(clockd.hasownproperty("track")){cns.fillstyle="clockd["track"];}else{cns.fillStyle="#DAA520";}" cns.linewidth="3;" cns.moveto((size="" 2),(size="" 2));="" cns.arc((size="" 25,0,6.29,0);="" cns.lineto((size="" r="parseInt(milisec)*0.00628;" calcms="Math.cos(r-1.57)*(size/25);" yms="Math.sin(r-1.57)*(size/25);" calc="Math.cos(r-1.57)*(size/5);" y="Math.sin(r-1.57)*(size/5);" calcm="Math.cos(r-1.57)*(size/3.2);" ym="Math.sin(r-1.57)*(size/3.2);" calcu="Math.cos(r-1.57)*(size/2.5);" yu="Math.sin(r-1.57)*(size/2.5);" if(clockd.hasownproperty("indicate_color")){cns.strokestyle="clockd["indicate_color"];}else{cns.strokeStyle="#333";}" 5),0,6.28,0);="" cns.arc(calc+(size="" 2),y+(size="" 42,0,6.28,0);="" 2)+calc,(size="" 2)+y,size="" 24,0,6.28,0);="" 2)+calc+calcms,(size="" 2)+y+yms,size="" 110,0,6.28,0);="" 3.2,0,6.28,0);="" cns.arc(calcm+(size="" 2),ym+(size="" 2.5,0,6.28,0);="" cns.arc(calcu+(size="" 2),yu+(size="" 22,0,6.28,0);="" clock_roulette(size,="" if(a<0){a="24+a;}" if(b<0){b="24+b;}" if(c="">23){c=c-24;}
  if(d>23){d=d-24;}
  if(e>23){e=e-24;}

  var f=hour;
  if(a<10){a="0"+a;} if(b<10){b="0" +b;}="" if(c<10){c="0" +c;}="" if(d<10){d="0" +d;}="" if(e<10){e="0" +e;}="" if(f<10){f="0" +f;}="" cns.font="size/10+"pt" arial";="" cns.fillstyle="(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";" cns.filltext(a,size="" 5,size="" 10-size="" 5*min="" 60-size="" 5*sec="" 36000);="" cns.filltext(b,size="" 10+size="" 5-size="" cns.globalalpha="0.3;" cns.filltext(f,size="" 10+2*size="" 3600);="" cns.filltext(c,size="" 10+3*size="" cns.filltext(d,size="" 10+4*size="" cns.filltext(e,size="" 10+5*size="" var="" a="min-2;var" b="min-1;var" c="min+1;var" d="min+2;var" e="min+3;" if(a<0){a="60+a;}" if(b<0){b="60+b;}" if(c="">59){c=c-60;}
  if(d>59){d=d-60;}
  if(e>59){e=e-60;}

  var f=min;
  if(a<10){a="0"+a;} if(b<10){b="0" +b;}="" if(c<10){c="0" +c;}="" if(d<10){d="0" +d;}="" if(e<10){e="0" +e;}="" if(f<10){f="0" +f;}="" cns.fillstyle="(clockd.hasOwnProperty("dial2_color"))?clockd["dial2_color"]:"#333333";" cns.filltext(a,size="" 2,size="" 10-size="" 5*sec="" 60-size="" 5*milisec="" 60000);="" cns.filltext(b,size="" 10+size="" 5-size="" cns.globalalpha="0.3;" cns.filltext(f,size="" 10+2*size="" cns.filltext(c,size="" 10+3*size="" cns.filltext(d,size="" 10+4*size="" cns.filltext(e,size="" 10+5*size="" var="" a="sec-2;var" b="sec-1;var" c="sec+1;var" d="sec+2;var" e="sec+3;" if(a<0){a="60+a;}" if(b<0){b="60+b;}" if(c="">59){c=c-60;}
  if(d>59){d=d-60;}
  if(e>59){e=e-60;}

  var f=sec;
  if(a<10){a="0"+a;} if(b<10){b="0" +b;}="" if(c<10){c="0" +c;}="" if(d<10){d="0" +d;}="" if(e<10){e="0" +e;}="" if(f<10){f="0" +f;}="" cns.fillstyle="(clockd.hasOwnProperty("dial3_color"))?clockd["dial3_color"]:"#333333";" cns.filltext(a,size="" 5*4,size="" 10-size="" 5*milisec="" 1000);="" cns.filltext(b,size="" 10+size="" 5-size="" cns.globalalpha="0.3;" cns.filltext(f,size="" 10+2*size="" cns.filltext(c,size="" 10+3*size="" cns.filltext(d,size="" 10+4*size="" cns.filltext(e,size="" 10+5*size="" if(clockd.hasownproperty("date_add")="" &&="" clockd.date_add)="" {="" date_add((size="" 2),size="" 5*3+size="" 10,="" size,="" cns,="" clockd);="" }="" if(clockd.hasownproperty("indicate")="" clockd.indicate)="" cns.strokestyle="(clockd.hasOwnProperty("indicate_color"))?clockd["indicate_color"]:"#333333";" cns.beginpath();="" cns.moveto(0,(size="" 2));="" cns.lineto(size,(size="" cns.stroke()="" cns.closepath();="" clockd.timer="setTimeout(function(){clock_roulette(size," clockd)},50);="" function="" clock_binary(size,="" clockd)="" var="" now="new" date();="" time_off="(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;" now.settime(now.gettime()+time_off*1000);="" milisec="now.getMilliseconds();" sec="now.getSeconds();" min="now.getMinutes();" hour="now.getHours()%12;" cns.clearrect(0,0,size,size);="" if(clockd.hasownproperty("bg_color")){cns.fillstyle="clockd["bg_color"];}else{cns.fillStyle="#ffffff";}" cns.rect(0,0,size,size);="" cns.fill();="" if(clockd.hasownproperty("bgloaded")="" clockd.bgloaded="=1){if(clockd.hasOwnProperty("bg_opacity")){cns.globalAlpha=clockd["bg_opacity"];cns.drawImage(clockd.bgImage,0,0,size,size);cns.globalAlpha=1;}}" hourstr="" ;="" if(hour<1){hourstr="0" ;}="" while(hour="">0)
  {
  hourstr=hour%2+hourstr;
  hour=hour-hour%2;
  hour=hour/2;
  }
  if(hourstr.length<6){while(hourstr.length<6){hourstr="0"+hourstr;}} minstr="" ;="" if(min<1){minstr="0" ;}="" while(min="">0)
  {
  minstr=min%2+minstr;
  min=min-min%2;
  min=min/2;
  }
  if(minstr.length<6){while(minstr.length<6){minstr="0"+minstr;}} secstr="" ;="" if(sec<1){secstr="0" ;}="" while(sec="">0)
  {
  secstr=sec%2+secstr;
  sec=sec-sec%2;
  sec=sec/2;
  }
  if(secstr.length</6){while(minstr.length<6){minstr="0"+minstr;}}></6){while(hourstr.length<6){hourstr="0"+hourstr;}}></10){a="0"+a;}></10){a="0"+a;}></10){a="0"+a;}></10){hour="0"+hour;}></10){hour="0"+hour;}>