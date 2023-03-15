var new_loc=localStorage.getItem('location')
let user_loc=document.getElementById("user_location")
if(new_loc==null){
    
    user_loc.innerText="Select Location"
}
else{
    user_loc.innerText=new_loc
}
        