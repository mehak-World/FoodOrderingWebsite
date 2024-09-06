const users = [
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

const User = () => {
  return users.map((user) => {
    return (
      <div className="cards" style={{ display: "inline-flex" }}>
        <div className="user-card" style={{ border: "1px solid black" , margin: "10px", padding: "10px"}}>
          <h2>{user.name}</h2>
          <p>{user.location}</p>
          <p>{user.socialMediaHandle}</p>
        </div>
      </div>
    );
  });
};

export default User;
