console.log("Admin Start")

$.ajax({
    async : false,
    method : 'get',
    url : '/admin/main',
    success : (result) => {
     console.log(result);
    }
})