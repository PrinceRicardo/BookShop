import React from 'react'

const RemoveBook = ({id}) => {

    const handleRemoveBook = (e) =>{
        //console.log(e.target.id)
        const req = new Request(
            'http://localhost:3000/admin/remove' + e.target.id, {
                method: "DELETE", 
                headers: {
                    "content-type": application/json
                },
            }
        )
        fetch(req)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // steMsg(data)
        })
        .catch(err => console.error(err))
    }
}

return