import Cookies from 'js-cookie'
import axios from 'axios';

function TeacherCookie() {
            axios.post('https://ursacapi.000webhostapp.com/api/getInstructors.php', Cookies.get('teacherID'))
            .then((response) => {
                if(response.data) {
                    Cookies.set('userInfo', response.data[0].firstName + ' ' + response.data[0].lastName)
                    Cookies.set('college', response.data[0].college)
                    Cookies.set('course', response.data[0].course)
                }
                
            })
            .catch(error => {
                console.log(error);
            })
}

export default TeacherCookie