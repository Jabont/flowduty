let agd = {};
agd.title = "YCC 2019 | Day-1";
agd.workspace = {};
agd.workspace.name = "IT CAMP 2019";
agd.workspace.id = 369;
let slotTmp = [];
let slotNew = [];
let slotNew2 = [];
let slotLast = [];
let slotData = {};
let nowID = 2;
let slotArray = [];

var v_agd_title = new Vue({
	el: '#agd_title',
	data: {
		message: '___'
	}
})

var people = {
	"1623763270":{
		id:"1623763270",
		display:"Jabont IT8",
		userName:"Jabont",
		role:"Advisor",
		squad:["สันทนาการ","ที่ปรึกษา"],
		permission:{
			read:true,
			write:true
		}
	},
	"100000331270605":{
		id:"100000331270605",
		display:"New IT16",
		userName:"New",
		role:"รองประธานค่าย",
		squad:["ประธานค่าย"],
		permission:{
			read:true,
			write:true
		}
	},
	"100002741030585":{
		id:"100002741030585",
		display:"Ong IT16",
		userName:"Ong",
		role:"ประธานค่าย",
		squad:["ประธานค่าย"],
		permission:{
			read:true,
			write:true
		}
	},
};

var squad = {
	"สันทนาการ":{
		people:1,
		dur:0,
	},
	"ที่ปรึกษา":{
		people:1,
		dur:0,
	},
	"วิชาการ":{
		people:0,
		dur:0,
	},
	"ประสานงาน":{
		people:0,
		dur:0,
	},
	"สถานที่":{
		people:0,
		dur:0,
	},
	"สวัสดิการ":{
		people:0,
		dur:0,
	},
	"ประธานค่าย":{
		people:2,
		dur:0,
	},
	"การ์ด":{
		people:0,
		dur:0,
	},
	"พยาบาล":{
		people:0,
		dur:0,
	},
	"ทะเบียน":{
		people:0,
		dur:0,
	},
	"พิธีการ":{
		people:0,
		dur:0,
	},
};

var duty = {
	"s1":0
}

let theVenue = []

slotNew[540] = {
	"id": "s0",
	"title": "พิธีเปิด",
	"dur": 60,
	"venue": "ออดิทอเรียม",
	"minD": 540,
	"start": [
	9,
	0
	],
	"stop": [
	10,
	0
	]
}
slotNew[720] = {
	"id": "s1",
	"title": "พักกลางวัน",
	"dur": 60,
	"venue": "โรงอาหาร",
	"minD": 720,
	"start": [
	12,
	0
	],
	"stop": [
	13,
	0
	]
}
slotTmp = slotNew;


function rendAgendaInfo(){
	v_agd_title.message = agd.title;
}

function rendAgendaSlot(){
	let q = 1;
	theVenue = [];
	agenda_body.innerHTML = '';
	for (let i in slotNew) {
		if (slotNew[i] != undefined) {
			let id = slotNew[i].id;
			let start = slotNew[i].start;
			let stop = slotNew[i].stop;
			let title = slotNew[i].title;
			let venue = slotNew[i].venue;
			console.log(venue);
			theVenue = theVenue.filter(f => f != venue).concat([venue]);
			console.log(theVenue);
			let dur = slotNew[i].dur;
			let row = document.createElement('div');
			row.innerHTML = renderSlotItem(id,q,start,stop,title,venue,dur,i);
			agenda_body.appendChild(row);
			q++;

			slotData[id] = slotNew[i];
		}else{
			slotTmp.splice(i,1);
			slotNew.splice(i,1);
		}
	}
	expectMinD = -1;
	renderVenueList();
}

function renderVenueList() {
	let option = "";
	for (let i in theVenue) {
		option += `<option>${theVenue[i]}</option>`
		
	}
	theVenue_list.innerHTML = option;
}

function renderPeople(){
	let txt = ``;
	for(i in people){
		txt += `
		<box col="1.5"><inner class="circle bg-grey-3">
		<div class="blank bg-cover" ratio="1:1" style="background-image:url('https://graph.facebook.com/${people[i].id}/picture?width=48&height=48')"></div>
		</inner></box>
		<box col="10.5"><inner class="">
		<h5 class="b5"><b>@${people[i].userName}</b> - ${people[i].display}</h5>
		</inner></box>
		`
	}
	peopleWrap.innerHTML = txt;
}

function addPeople(peopleObj){
	people[peopleObj.id] = peopleObj;
	renderPeople();
}
function agd_addNew(){
	let startH = parseInt(agdNew_startTimeH.value);
	let startM = parseInt(agdNew_startTimeM.value);
	let title = agdNew_title.value;
	let dur = parseInt(agdNew_duration.value);
	let venue = agdNew_venue.value;
	let id = "s"+nowID;
	nowID++;
	createSlotObj(id,title,startH,startM,dur,venue);
	let lastHM = minDtoTime(slotTmp[slotTmp.length-1].dur+slotTmp[slotTmp.length-1].minD);
	agdNew_startTimeH.value = (lastHM[0]).pad();
	agdNew_startTimeM.value = (lastHM[1]).pad();
	agdNew_title.value = '';
	agdNew_duration.value = '60';
	agdNew_title.focus();
	return false;
}


function createSlotObj(id,title,startH,startM,dur,venue){
	
	let newSlot =  {
		id:id,
		title:title,
		dur:dur,
		venue:venue,
		minD:timeToMinD(startH,startM)
	}
	prepareSlotTmp(newSlot);
	console.log(newSlot);
}

function prepareSlotTmp(newSlot){
	slotNew = [];
	NextMinD = newSlot.minD+newSlot.dur;
	for(let i in slotTmp){
		if (i>=newSlot.minD) {
			//สลอตเก่าอยู่ข้างล่าง
			if (i<NextMinD) {
				slotNew[NextMinD] = slotTmp[i];
				slotNew[NextMinD].minD = NextMinD;
				slotNew[NextMinD].start = minDtoTime(NextMinD);
				slotNew[NextMinD].stop = minDtoTime(NextMinD+slotTmp[i].dur);
				NextMinD += slotTmp[i].dur;
				if (i == newSlot.minD) {
					slotTmp[i] = undefined;
					slotTmp.splice(i,1);
				}
			}
			else{
				slotNew[i] = slotTmp[i];
				if (slotNew[i] != undefined) {
					NextMinD = i+slotNew[i].dur;
				}
			}
		}
	}
	belowMinD = newSlot.minD;
	for (let i = newSlot.minD; i >= 0; i--) {
		if (slotTmp[i] != undefined) {
			if (i+slotTmp[i].dur<=belowMinD) {
				slotNew[i] = slotTmp[i];
				belowMinD = slotTmp[i].minD;
			}
			else{
				belowMinD = belowMinD - slotTmp[i].dur;
				slotNew[belowMinD] = slotTmp[i];
				slotNew[belowMinD].minD = belowMinD;
				slotNew[belowMinD].start = minDtoTime(belowMinD);
				slotNew[belowMinD].stop = minDtoTime(belowMinD + slotTmp[i].dur);
			}
		}
	}
	slotNew[newSlot.minD] = newSlot;
	slotNew[newSlot.minD].start = minDtoTime(newSlot.minD);
	slotNew[newSlot.minD].stop = minDtoTime(newSlot.minD+newSlot.dur);
	rendAgendaSlot();
	slotTmp = slotNew;

}

function prepareSlotTmpOld(){
	slotNew = [];
	let NextMinD = 0;
	let isFirstSlot = 1;
	for (let i in slotTmp) {
		if (isFirstSlot) {
			slotNew[i] = slotTmp[i];
			isFirstSlot = 0;
			NextMinD = slotTmp[i].minD+slotTmp[i].dur;
		}else{
			slotNew[NextMinD] = slotTmp[i];
			slotNew[NextMinD].minD = NextMinD;
			NextMinD = NextMinD+slotTmp[i].dur;
		}
	}
	for (let i in slotNew) {
		let startTime = slotNew[i].minD;
		let stopTime = slotNew[i].minD+slotNew[i].dur;
		startTime = minDtoTime(startTime);
		stopTime = minDtoTime(stopTime);
		slotNew[i].start = {};
		slotNew[i].stop = {};
		slotNew[i].start.h = startTime[0];
		slotNew[i].start.m = startTime[1];
		slotNew[i].stop.h = stopTime[0];
		slotNew[i].stop.m = stopTime[1];
	}
	slotTmp = slotNew;
}

const timeToMinD = (h,m) => {return (h*60)+m}

const minDtoTime = minD => {
	let h = parseInt(minD/60);
	let m = minD%60;
	return [h,m];
}
let expectMinD = -1;
const renderSlotItem = (id,q,start,stop,title,venue,dur,minD) => {
	let txt = '';
	if (expectMinD != -1 && expectMinD != minD) {
		txt += `<sp class="bg-smoke l agendaGap" ondblclick="removeGap(${minD-expectMinD},${minD},this)" title="Double Clicks for remove the gap"></sp>`;
	}
	txt += `
	<theboxes class="middle spacing-s -clip">
	<box col="1"><inner class="padding padding-vs-hzt t-center b7">
	${q}
	</inner></box>

	<box col="2"><inner class="padding padding-vs-hzt t-center b5 bg-grey-1" onclick="changeStartTime('${id}')">
	${(start[0]).pad()}:${(start[1]).pad()} - ${(stop[0]).pad()}:${(stop[1]).pad()}
	</inner></box>
	<box col="4.5"><inner class="t-left b7">
	<!--<span class="size-s upper b5 cl-grey">${id}</span> -->
	<input class="input wide cl-black padding-vs-hzt no-bd inline-block" type="text" placeholder="Title" required autocomplete="off" value="${title}" minD="${minD}" onchange="changeSlotData(this,'title')">
	</inner></box>
	<box col="2.5"><inner class="t-left b5">
	<input class="input wide padding-s-hzt no-bd" type="text" value="${venue}" list="theVenue_list" autocomplete="off" minD="${minD}" onchange="changeSlotData(this,'venue')">
	</inner></box>
	<box col="1"><inner class="b7">
	<input class="padding-xs-hzt input wide t-center no-bd durSlot" type="number" placeholder="D" required="" value="${dur}" step="5" min="0" minD="${minD}" onchange="changeDuration(this)">
	</inner></box>
	<box col="1"><inner class="padding padding-vs-hzt t-center b7">
	..
	</inner></box>
	</theboxes><sp class="px bg-grey-3"></sp>
	`;
	expectMinD = parseInt(dur) + parseInt(minD);
	return txt;
}

Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}

const changeDuration = (x) => {
	newDuration = parseInt(x.value);
	minD = x.getAttribute('minD');
	if (x.value != '') {
		if (newDuration == 0) {
			if (confirm('ต้องการลบ slot นี้หรือไม่')) {
				slotNew[minD] = undefined;
				slotNew.splice(minD,1);
				rendAgendaSlot();
			}
			else{
				x.value = 5;
			}
		}
		else{
			slotTmp[minD].dur = newDuration;
			calSlotOnChangeDuration(minD);
		}
	}
	else{
		x.value = slotTmp[minD].dur;
	}
}

const changeStartTime= (id) => {
	console.log(id);
	let tempSlot = slotData[id];
	console.log(tempSlot);
	let HH = (tempSlot.start[0]).pad();
	let MM = (tempSlot.start[1]).pad()
	let newTime = prompt("ระบุเวลาเริ่ม ในรูปแบบ HH:MM",`${HH}:${MM}`);
	newTime = newTime.split(":");
	HH = parseInt(newTime[0]);
	MM = parseInt(newTime[1]);
	if (Number.isInteger(HH) && Number.isInteger(MM) && MM<60 && HH>0) {
		let newMinD = timeToMinD(HH,MM);
		console.log(tempSlot.dur);
		let newSlot =  {
			id:id,
			title:tempSlot.title,
			dur:tempSlot.dur,
			venue:tempSlot.venue,
			minD:newMinD
		}
		slotTmp[tempSlot.minD] = undefined;
		slotTmp.splice(tempSlot.minD,1);
		prepareSlotTmp(newSlot);
	}
	else{
		alert('การระบุเวลาผิดพลาด')
	}
}

const changeSlotData= (x,prop) => {
	let newValue = x.value;
	let minD = x.getAttribute('minD');

	slotTmp[minD][prop] = newValue;
	rendAgendaSlot()
}

const calSlotOnChangeDuration = (newMinD) => {
	slotNew = [];
	NextMinD = 0;
	for(let i in slotTmp){
		if (i<=newMinD) {
			slotNew[i] = slotTmp[i];
			NextMinD = slotTmp[i].minD+slotTmp[i].dur;
			slotNew[i].stop = minDtoTime(NextMinD);
		}
		else{
			calSlotOnChangeBelow(i,NextMinD);
		}
	}
	slotTmp = slotNew;
	rendAgendaSlot();
	document.querySelector(`.durSlot[minD="${newMinD}"]`).focus();
}

const calSlotOnChangeBelow = (i,NextMinD) =>{
	if (i >= NextMinD) {
		slotNew[i] = slotTmp[i];
		NextMinD = slotTmp[i].minD+slotTmp[i].dur;
	}
	else{
		slotNew[NextMinD] = slotTmp[i];
		slotNew[NextMinD].minD = NextMinD;
		slotNew[NextMinD].start = minDtoTime(NextMinD);
		slotNew[NextMinD].stop = minDtoTime(NextMinD+slotTmp[i].dur);
		NextMinD = NextMinD+slotTmp[i].dur;
	}
}

const removeGap = (dur,minD,x) =>{
	slotNew = [];
	for(let i in slotTmp){
		if (i<minD) {
			slotNew[i] = slotTmp[i];
		}else{
			newMinD = slotTmp[i].minD - dur;
			slotNew[newMinD] = slotTmp[i];
			slotNew[newMinD].minD = newMinD;
			slotNew[newMinD].start = minDtoTime(newMinD);
			slotNew[newMinD].stop = minDtoTime(newMinD + slotTmp[i].dur);
		}
	}
	slotTmp = slotNew;
	rendAgendaSlot();
}




rendAgendaInfo();
rendAgendaSlot();
renderPeople();