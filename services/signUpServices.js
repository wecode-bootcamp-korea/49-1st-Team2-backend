const createUser = async (name, email, password, profileImage, nickname, phoneNumber, birthday) => {
    
    const pwValidation = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-].*/;

    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }
      const createUser = await userDao.createUser(
          name,
          email,
          password,
          profileImage,
          nickname,
          phoneNumber,
          birthday
        );
      
        return createUser;
      };

      const createUser = async ( name, email, password, profileImage, nickname, phoneNumber, birthday ) => {
        try {
          return await myDataSource.query(
          `INSERT INTO users(
            name,
            email,
            password
            profile_image,
                  nickname,
                  phone_number,
                  birthday
          ) VALUES (?, ?, ?, ?);
          `,
          [ name, email, password, profileImage, nickname, phoneNumber,birthday ]
          );
        } catch (err) {
          const error = new Error('INVALID_DATA_INPUT');
          error.statusCode = 500;
          throw error;
        }
      };





  
module.exports = {
  createUser
}



