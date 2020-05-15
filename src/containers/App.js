import React, {Component} from 'react';
import WorkoutSearch from '../components/WorkoutSearch';
import ExerciseSearch from '../components/ExerciseSearch';
import {connect} from 'react-redux';
import {setSearch} from '../actions/search';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import { PropTypes } from 'react';




//login to database - unsafe / move to secrets .env
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyS3Lg8wS2WMVLBD'}).base('appCUVYjYyYPP2KdR');
//acces modifier for dropping
var y;
//display top exercises
function populateGrid() {
let i = 0;
	base('Exercises').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 8,
    view: "Grid view",
		sort:[{field: "Uses", direction: "desc"}]
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      //console.log(i,record.get('Name'),record.get('Photo')[0].url);

			document.getElementById('top'+i).style.backgroundImage = 'url('+record.get('Photo')[0].url+')';
			document.getElementById('d'+i).innerHTML = record.get('Name');

			i++;
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

}
//call grid
populateGrid();




//start app
class App extends Component {



  // event listners



	onDrop = (e) => {
		e.preventDefault();
		console.log(y);

		arr.unshift('<div><img src="/components/svg/Drag.svg" style="position:absolute;right:30%;margin-top:30px" height="15px" width="15px"/><b style="padding-left:30px">'+ y + '</b><img src="/components/svg/Delete.svg" onclick="destroyer(event)" style="position:absolute;margin-top:-30px; right:23%" height="15px" width="15px"/></div>');


		if (e.target.style.backgroundColor == 'rgb(238,74,100)'){
			e.target.style.backgroundColor = 'rgb(243,243,243)'
		}else {
		e.target.style.backgroundColor = 'rgb(238,74,100)';
	}


		document.getElementById('panel').innerHTML = arr.join('');

		console.log('drop'+y);
	};


	onDragOver = (e) => {
		e.preventDefault();

		console.log('drag' + y);
	};


	onDragStart = (e) => {

		let p = e.target.outerHTML;
		 y = p;

		 return y;


		console.log('drag' + y);
	};




	onDragOverHover = (e) => {

		 let p = e.target.style.backgroundColor = 'rgb(240,240,240)';
		 e.preventDefault();

		console.log('drag' + y);
	};




//search for workouts

	_onChange = (value) => {

		var array = Array();


		this.props.dispatch(setSearch(value));

		console.log(value.length);



		if (value.length>=3){

		document.getElementById('dropdown').style.display = 'block';


			//test if input is correct
			if ((/^([a-z0-9]{3,})$/.test('value'))===true){

				debounce(
									//workout exercises database
								base('Workout').select({
										// Selecting the first 3 records in Grid view:
										maxRecords: 5,
										view: "Grid view",
										//sort by uses - TODO
										//sort:[{field: "Uses", direction: "desc"}]
								}).eachPage(function page(records, fetchNextPage) {
										// This function (`page`) will get called for each page of records.
										array = [];
										records.forEach(function(record) {


										// only first char check - can be developed
											if (value.charAt(0).toUpperCase().match(record.get('Name').charAt(0))){

												var text = '<li>'+record.get('Name') + '</li>' ;

												array.push(text);
												document.getElementById('dropdown').innerHTML = array.join('');
											}

										});

										// To fetch the next page of records, call `fetchNextPage`.
										// If there are more records, `page` will get called again.
										// If there are no more records, `done` will get called.
										//i read its 100 per page
										fetchNextPage();

								}, function done(err) {
										if (err) { console.error(err); return; }
								}),500); //delay for debounce
								}


							} else {
								document.getElementById('dropdown').style.display = 'none';
							}


};

//search for exercises
	_onChange2 = (input) => {

		var array=Array();


		this.props.dispatch(setSearch(input));

		console.log(input);

		if (input.length>=3){

		document.getElementById('dropdown2').style.display = 'block';



			if ((/^([a-z0-9]{3,})$/.test('value'))===true){

				debounce(
									//workout exercises database
								base('Exercises').select({
										// Selecting the number of records records in Grid view:
										maxRecords: 26,
										view: "Grid view"
								}).eachPage(function page(records, fetchNextPage) {
										// This function (`page`) will get called for each page of records.
										array = [];
										records.forEach(function(record) {


											// true
											if (input.charAt(0).toUpperCase().match(record.get('Name').charAt(0))) {

												var text = record.get('Name');
												array.push(text);
												const listItems = array.map((text) =>
													<li key={text} onClick={addtoColumn}>{text}</li>);

													ReactDOM.render(
													  <ul style={{textAlign:'left'}}>{listItems}</ul>,
													  document.getElementById('dropdown2')
													);



											//document.getElementById('dropdown2').innerHTML = 	array.join('');
											}

										});

										// To fetch the next page of records, call `fetchNextPage`.
										// If there are more records, `page` will get called again.
										// If there are no more records, `done` will get called.
										fetchNextPage();

								}, function done(err) {
										if (err) { console.error(err); return; }
								}),500);
								}


							} else {
								document.getElementById('dropdown2').style.display = 'none';
							}


};




//render the app JSX DOM




    render () {



        return (
        	<div style={{width:'100%',height:'100%',
					paddingLeft: '5%', paddingRight:'1%',
					paddingTop:'5%',left:'0px',top:'0px',

					position:'absolute',



					}}>
									<div style={{position:'absolute',top:'0px',left:'0px',
									width:'80%',height:'50px',
									marginBottom:'50px',paddingLeft:'50px',paddingRight:'50px'
								}}>



									<p><a href=""> <img style={{
									position:'relative',marginRight:'13px'}}
								 src="https://scontent.fath3-3.fna.fbcdn.net/v/t1.0-9/64545806_2655277794499757_5837268830560190464_n.png?_nc_cat=104&_nc_sid=85a577&_nc_eui2=AeHfcy6Fgm77OqLq5x9u10EIU_V0sYJkm_xT9XSxgmSb_Jv9Wj0uHPqEElW13TkZNc5HX_cEsDdWBboyNr_hvuVg&_nc_ohc=cgM_zys4X2oAX_u7X0c&_nc_ht=scontent.fath3-3.fna&oh=06237fdd46392dd9311bc9d1dadee4dc&oe=5EE508BA"
								  height="15px" width="15px"/><b style={{color:'rgb(238,74,100)',lineHeight:'15px'}}>holy</b> Workouts  🤸🏿‍</a></p>

								 <a style={{position:'fixed',right:'27%',top:'1%',fontSize:'10px',padding:'5px'}} href="https://github.com/Ys-sudo/holyWorkouts">
								 <img src="/components/svg/github.svg" height="15px" width="15px" />
								 </a>


								 <a href="/Howto">
 										<button className="mostdiv" style={{position:'fixed',right:'15%',top:'1%',fontSize:'10px',padding:'5px'}} id="how">how to use ?</button>
 								</a>



										<button onClick={nightDay} className="mostdiv" style={{position:'fixed',right:'21%',top:'1%',fontSize:'10px',padding:'5px'}} id="night">dark mode</button>

									<hr />
								</div>

									<div style={{right:'15%',top:'13%',
									position:'fixed',
									display:'flex',
								}}>




										<button onClick={countTime}  id="start">start</button>
										&nbsp;&nbsp;&nbsp;
										&nbsp;&nbsp;&nbsp;
										<button onClick={()=>{
											arr=[];
											document.getElementById('panel').innerHTML = arr;


												s='00';
												m='0';
											document.getElementById('clock').innerHTML = m+':'+s+ '<b> m</b>'
										}} id="cleaningservice">clear</button>
										&nbsp;&nbsp;&nbsp;
										&nbsp;&nbsp;&nbsp;
										<button onClick={populateBase} id="save">save</button>

									</div>



						{/*Heading and workouts UI*/}

						<div style={{
							paddingLeft:'10%',
							paddingRight:'10%'
						}}>
						<p style={{
							marginLeft:'10px'
						}}> <a href="/#exercises"><b style={{color:'rgb(238,74,100)'}}>Customize</b> your workout:</a></p>
						<p
						style={{position:'fixed',right:'15%',top:'8%'}}>
						Total time: <b><span id="clock">0:00<b> m</b></span></b></p>
						&nbsp;
						<br></br>

									<WorkoutSearch

											onChange={this._onChange.bind(this)}

											/>
											<div>
											<ul id="dropdown">
											</ul>
											</div>

									</div>



						<div style={{display:'flex',paddingLeft:'10%',
						paddingRight:'10%'}}
							>







							{/*search and break UI*/}

								<div
								style={{width:'40%',
								backgroundColor:'rgb(222,222,222)',
								borderRadius:'20px',
								margin:'1.5%',padding:'1%',textAlign:'center'}}
								className="mostdiv"
								>

											<ExerciseSearch id="search"
											onChange={this._onChange2.bind(this)}

											/>
											<div>
											<div id="dropdown2">
											</div>
											</div>

											<br></br>

											<button onClick={addBreak} id="break"
											style={{width:'93%',
											paddingLeft:'10px',textAlign:'center',lineHeight:'15px',alignItems:'center',
											marginLeft:'1%',height:'45px',borderRadius:'10px'}}>

											<img style={{
											position:'relative',marginRight:'35%'
										}} src="/components/svg/Break.svg" height="15px" width="15px"/>
											<span>
											add break
											</span>
											<img style={{
												position:'relative',marginLeft:'35%',
											}} src="/components/svg/Add_White.svg" height="15px" width="15px"/>

											</button>

											<div id="exercises"
									style={{ marginLeft:'15px',marginRight:'15px',
									textAlign:'center'
									}}

										>

										<br></br>
										<p style={{textAlign:'left',marginLeft:'2.5%',color:'gray'}}>
										Top exercises:</p>


										{/*exercises

											false images / add mask || grayscale filter on hover?
											 and data is bad generally need to improve

											*/}



										<div style={{
											display:'flex',
										}}>
											<div className="image"

											id="top0"
											onClick={(e) => {
												// i don't know why yet but it fixes the
												//duplication problem, string hardcoded / TODO
												//creativity wins!
												let p = 'Lethal Dreadlifts';

												arr.unshift('<div class="special mostdiv"><img src="/components/svg/Drag.svg" style="margin-right:30px" height="15px" width="15px"/><b>'+p+'</b><img src="/components/svg/Delete.svg" onclick="destroyer(event)" style="position:absolute; right:23%" height="15px" width="15px"/></div>');

												console.log(document.getElementsByClassName('dupli'));

												console.log(p);

												document.getElementById('panel').innerHTML = arr.join('');
											}}
											><p id="d0" draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)}  className="desc" >
											</p>

											</div>

											<div className="image"

											id="top1"
											onClick={gridtoColumn}

											><p draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)} id="d1" className="desc" >
											</p>
											</div>
										</div>

										<div style={{
											display:'flex',
										}}>
											<div className="image"

											id="top2"
											onClick={gridtoColumn}

											><p draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)} id="d2" className="desc" >
											</p>

											</div>

											<div className="image"

											id="top3"
											onClick={gridtoColumn}

											><p draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)} id="d3" className="desc" >
											</p>

											</div>
										</div>

										<div style={{
											display:'flex',
										}}>
											<div className="image"

											id="top4"
											onClick={gridtoColumn}

											><p draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)}  id="d4" className="desc" >
											</p>

											</div>

											<div className="image"

											id="top5"
											onClick={gridtoColumn}

											><p draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)} id="d5" className="desc" >
											</p>

											</div>
										</div>

										<div style={{
											display:'flex',
										}}>
											<div className="image"

											id="top6"
											onClick={gridtoColumn}

											><p draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)} id="d6" className="desc" >
											</p>

											</div>

											<div className="image"

											id="top7"
											onClick={gridtoColumn}


											>
											<p draggable="true" onDragStart={(e)=>this.onDragStart(e)}  onDragOver={(e)=>this.onDragOver(e)} id="d7" className="desc" >
											</p>

											</div>
										</div>





									</div>


								</div>




								{/*the output for exercises container


									dragover ondrop reorder

									onDragOver={(e)=>this.onDragOver(e)}
									onDrop={(e)=>{this.onDrop(e)}}


									*/}

								<div
								style={{width:'40%',
								backgroundColor:'rgb(222,222,222)',
								borderRadius:'20px',
								margin:'1.5%',padding:'2%',textAlign:'center'}}
								className="mostdiv"
								id="panel"
								onDragOver={(e)=>this.onDragOverHover(e)}
								onDrop={(e)=>{this.onDrop(e)}}

								>

								</div>





						</div>


	        </div>
        )
    }
}

export default connect(state => state)(App);

App.propTypes = {
    _onChange2: React.PropTypes.func,
		_onChange: React.PropTypes.func,

};



//insert break block  <input style="margin-left:30%;width:30px" placeholder="5min" type="number/>
function addBreak(){
	<img src="/components/svg/Break.svg" height="15px" width="15px"/>
		arr.unshift('<div class="break mostdiv" draggable="true"><img src="/components/svg/Break.svg" style="margin-right:30px" height="15px" width="15px"/><b>Break</b> 5 min'+'<img src="/components/svg/Delete.svg" onclick="destroyer(event)" style="position:absolute; right:23%" height="15px" width="15px"/></div>');
		//console.log(arr);
		document.getElementById('panel').innerHTML = arr.join('');
	}




//dynamic exercises
	function gridtoColumn(e){

		let p = e.target.innerHTML;


		base('Exercises').select({
				// Selecting the first 3 records in Grid view:
				maxRecords: 8,
				view: "Grid view",
				sort:[{field: "Uses", direction: "desc"}]
		}).eachPage(function page(records, fetchNextPage) {
				// This function (`page`) will get called for each page of records.

				records.forEach(function(record) {


					// true
					if (p.match(record.get('Name'))) {
						//fix the duplication on first item ...


						console.log(p);

						arr.unshift('<div class="desc mostdiv" draggable="true"><img src="/components/svg/Drag.svg" style="margin-right:30px" height="15px" width="15px"/><b>'+record.get('Name')+'</b><img src="/components/svg/Delete.svg" onclick="destroyer(event)" style="position:absolute; right:23%" height="15px" width="15px"/></div>');
						document.getElementById('panel').innerHTML = arr.join('');










					}

				});

				// To fetch the next page of records, call `fetchNextPage`.
				// If there are more records, `page` will get called again.
				// If there are no more records, `done` will get called.
				fetchNextPage();

		}, function done(err) {
				if (err) { console.error(err); return; }
		})



				};








// from search results

function addtoColumn(e){

	let p = e.target.innerHTML;

	base('Exercises').select({
			// Selecting the first 3 records in Grid view:
			maxRecords: 26,
			view: "Grid view"
	}).eachPage(function page(records, fetchNextPage) {
			// This function (`page`) will get called for each page of records.

			records.forEach(function(record) {


				// true
				if (p.match(record.get('Name'))) {
					console.log(p);
					arr.unshift('<div class="desc mostdiv" draggable="true" ><img src="/components/svg/Drag.svg" style="margin-right:30px" height="15px" width="15px"/><b>'+p+'</b><img src="/components/svg/Delete.svg" onclick="destroyer(event)" style="position:absolute; right:23%" height="15px" width="15px"/></div>');

						document.getElementById('panel').innerHTML = arr.join('');




				}

			});

			// To fetch the next page of records, call `fetchNextPage`.
			// If there are more records, `page` will get called again.
			// If there are no more records, `done` will get called.
			fetchNextPage();

	}, function done(err) {
			if (err) { console.error(err); return; }
	})



};

let running;
let s = 0;
let m = 0;



function fireTimer(){




	var t = setInterval( function(){

		if(running == true){
			clearInterval(t);
		};

		s++;
		//for pro time format:
		if(s<10){
			s='0'+s;
		}
		console.log(m+':'+s);
			if (s%60==0){
			s =0;
			m++;
			//console.log(m+':'+s);
			}
			 document.getElementById('clock').innerHTML = m+':'+s + '<b style="color:rgb(238,74,100)"> m</b>';
	},1000);






}




function countTime() {

if(document.getElementById('start').innerHTML == 'start')
{
	fireTimer();
	running = true;
	document.getElementById('start').innerHTML = 'pause';


}
else if (document.getElementById('start').innerHTML == 'pause')
{

	running= false;
	document.getElementById('start').innerHTML = 'start'


};


//timing modifiers - might be hard to understand how this works,
//reversing the values allows reusing the call
//and keeping it all in one function

if (running==true){
	running = false;





}else{

	running = true;



}








	 console.log(running);




 }


 //debounce
 function debounce(func, wait, immediate) {
 	var timeout;
 	return function() {
 		var context = this, args = arguments;
 		var later = function() {
 			timeout = null;
 			if (!immediate) func.apply(context, args);
 		};
 		var callNow = immediate && !timeout;
 		clearTimeout(timeout);
 		timeout = setTimeout(later, wait);
 		if (callNow) func.apply(context, args);
 	};
 };


	function populateBase(){
		//here goes save to base code - coming soon
		alert('Coming Soon 🤸')
	}


	function nightDay(){
		//here goes save to base code - coming soon
		alert('Coming Soon 🤸')
	}