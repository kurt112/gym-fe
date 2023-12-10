import Swal from "sweetalert2";

export const firstNameLastNameAndMiddleNamePopUpForm:any = async ()  => await  Swal.fire({
    title: 'Customer Details',
    html:
        '<p class="text-black">Firsname</p> <input id="firstName" placeholder="Enter First Name" class="firstName form-control">' + '<br>' +
        '<p class="text-black">Lastname</p> <input id="lastName" placeholder="Enter Last Name" class="lastName form-control">' + '<br>' +
        '<p class="text-black">Middle Name (Optional) </p> <input id="middleName" placeholder="Full Middle Name" class="lastName form-control">' + '<br>',
    focusConfirm: false,
    preConfirm: () => {

        let firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
        const lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
        const middleName = (<HTMLInputElement>document.getElementById('middleName')).value;
        return [
            firstName,
            lastName,
            middleName
        ]
    }
});

export const firstNameLastNameAndMiddleNameTopupPopUpForm:any = async ()  => await  Swal.fire({
    title: 'Customer Details',
    html:
        '<p class="text-black">Firsname</p> <input id="firstName" placeholder="Enter First Name" class="firstName form-control">' + '<br>' +
        '<p class="text-black">Lastname</p> <input id="lastName" placeholder="Enter Last Name" class="lastName form-control">' + '<br>' +
        '<p class="text-black">Middle Name (Optional) </p> <input id="middleName" placeholder="Full Middle Name" class="lastName form-control">' + '<br>' +
        '<p class="text-success fs-bold fw-bold">Amount</p> <input type="number" id="top-up" placeholder="The value of top-up" min="1" class="top-up form-control">' + '<br>',
    focusConfirm: false,
    preConfirm: () => {

        let firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
        const lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
        const middleName = (<HTMLInputElement>document.getElementById('middleName')).value;
        const amount = (<HTMLInputElement>document.getElementById('top-up')).value;

        if(+amount <=0){
            return alert("Invalid Amount");
        }

        return [
            firstName,
            lastName,
            middleName,
            amount
        ]
    }
});

