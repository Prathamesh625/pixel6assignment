import axios from "axios"

//  pan verification api sevice

const pan_verification_url = "https://lab.pixel6.co/api/verify-pan.php";


export const verifyPan = async(pan_no) => {
    
    const response = await axios.post(pan_verification_url, {
      panNumber: pan_no,
    });
    
    return response;

}

// get post code api service


const post_code_url = "https://lab.pixel6.co/api/get-postcode-details.php";

export const getPostCode = async(post_code) => {
    
    const response = await axios.post(post_code_url, {
        
        postcode:post_code

    })

    return response;
}



const post_code_url_2 = "https://lab.pixel6.co/api/get-postcode-details.php";

export const getPostCode2 = async (post_code) => {
  const response = await axios.post(post_code_url, {
    postcode: 411005,
  });

  return response;
};


