import React, {Component} from 'react';

import {Button} from 'reactstrap';
function getHt()
{
    return document.documentElement.clientHeight;
}
let ht = getHt()-50;
class Login extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            login : [
              {  
                key :'email',
                type : 'text',
                val : null,
                required : true,
                holder : 'ex@mail.com',
                valid : true,
                errMsg : "Invalid Email!!",
                regEx : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              },
              {  
                key :'password',
                type : 'password',
                val : null,
                holder : 'Password',
                valid : true,
                required : true,
                errMsg :
                 "Password must conatin 1st letter capitalized,1 special character,a number.",
                regEx : /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,19}$/
              }
            ],
            formValid : true,
            formSubmitted : false
        }
    }
   
    Validate(val,index)
    {
        let {key,required,type,regEx} = this.state.login[index];
        if( required )
        {
            if(!(val.length>0))
            return false;

            // if( key === 'password' && val.length > 6)
            // return false;
        }
        switch(type)
        {
            case ('none'):
                if(regEx)
                return val.match(regEx)?true:false
            return true;
            default :
                return val.match(regEx)?true:false;
        }
    }
    inputChanged({target:{value}},index)
    {
        let isValid = this.Validate(value,index)
        let tempArr = this.state.login.slice(0);
        tempArr[index].val = value;
        tempArr[index].valid = isValid;

        this.setState({login : tempArr })

    }
    validateForm()
    {
        for(let i=0;this.state.login[i];i++)
        {
            if( !this.state.login[i].valid )
                return false;
        }
        return true;
    }
    submitted(e)
    {
        e.preventDefault();
        let isFormValid = this.validateForm();
        console.log(this.props)
        if( isFormValid)
           {
                let e = this.state.login[0].val; 
                let p = this.state.login[1].val;
                if( e === "vkvishal@gmail.com" && p === "Pass@123")
                    this.props.isLoggedIn(true);
                else
                    this.props.isLoggedIn(false);
           }
        else
            this.setState({formSubmitted : false, formValid : false })
    }
    render(){
        let { login } = this.state;
        let {formValid , formSubmitted } =this.state;
        return(
            <form onSubmit = {(e)=>{this.submitted(e)}}>
            <div className="flex-container">
            <div style={{margin: '3px', fontSize:'30px', padding :'3px', backgroundColor:"#ccc",color:"blue"}}>
                <h4>Log In</h4>
            </div>
                <div style={{margin:'10px'}}>
               {login.map( (input,index) =>{
                   return(
                        <div> 
                            <input style={{width: "370px", height: '30px', marginTop:'10px'}} type= {input.type} value = {input.val} onChange={(e)=>this.inputChanged(e,index)} placeholder={input.holder}></input>
                            { !input.valid && <div style = { { color :'red',padding :'3px'} }>{ input.errMsg}</div>}
                        </div>
                   )
               }
               )}
               </div>
               <div style={{margin:'10px',height:'100px'}}>
                    <Button variant = 'contained' color = 'primary' 
                    onClick={(e)=>this.submitted(e)}
                    disabled={!(this.state.login[0].val && this.state.login[1].val)}>
                        Submit
                    </Button>
                 </div>
                    { !formValid && <div style = {{padding:'3px',color :'red'}}>
                        Form is Invalid </div>}
                    { formSubmitted && <div style = {{padding:'3px',color :'green'}}>
                        Congratulations !! Form is submitted successfully </div>}
               
            </div>
           </form>
        );
    }
}
export default Login