import React, {useEffect} from 'react';

const Index = () => {
  useEffect(() => {

    fetch('http://localhost:8080/api/v1/tasks', {
      method: 'GET',
      headers: {
        Cookie: "authId=3dd66bee-4157-4961-8a05-187eb37d610b; Webstorm-594babca=20f851b9-b1f7-4ce3-82ec-8d4745bcc100"
      }

    })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  return (
    <div>

    </div>
  );
};

export default Index;

//authId=048542a6-5a56-49ac-9a39-1c279d3205a6