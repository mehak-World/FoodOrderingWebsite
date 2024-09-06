import {Component} from "react";

let users = [
    {
      name: "Mehak Narang",
      location: "Abbotsford, BC, Canada",
      socialMediaHandle: "mehaknarang@0609",
    },
    {
      name: "Hardik Narang",
      location: "Zirakpur, India",
      socialMediaHandle: "hardiknarang@2407",
    },
  ];

class UserClass extends Component{
    
    constructor(props){
        super(props);
        console.log(props);
        this.state= {
            count: 0
        }
    }

    render(){
        let count = this.state.count;
        return users.map((user) => {
            return (
              <div className="cards" style={{ display: "inline-flex" }}>
                <div className="user-card" style={{ border: "1px solid black" , margin: "10px", padding: "10px"}}>
                  <h3>Count: {this.state.count}</h3>
                  <button onClick = {() => {
                    this.setState({count : this.state.count+1}

                    )}}
                    >Increase Count</button>
                  <h2>{user.name}</h2>
                  <p>{user.location}</p>
                  <p>{user.socialMediaHandle}</p>
                </div>
              </div>
            );
          });
    }
}

export default UserClass;