const clubModel = require('./club.model')
const userSvc = require('./../user/user.service')

class ClubService{
    async clubRegister(req){
         const data = req.body;
         try{
            const registeredClubInfo = await clubModel.create(data);
            return registeredClubInfo;
         }
         catch(exception){
            throw exception;
         }

    }
    async getAllClubs(){
      try{
          const clubs = await clubModel.findAll();
          return clubs;
      }catch(exception){
          throw exception;
      }
  }

  async getSingleClub(req){
      const { id } = req.params;
      try{
          const club = await clubModel.findById(id);
          if (!club){
              throw {
                  code: 404,
                  message: "Club not found",
                  status: "CLUB_NOT_FOUND"
              };
          }
          return club;
      }catch(exception){
          throw exception;
      }
  }

  async updateClub(req){
      const { id } = req.params;
      const data = req.body;

      try{
          const club = await clubModel.findById(id);
          if (!club){
              throw {
                  code: 404,
                  message: "Club not found",
                  status: "CLUB_NOT_FOUND"
              };
          }

          const updatedData = {
              club_name: data.club_name || club.club_name,
              description: data.description || club.description
          };

          await clubModel.update(id, updatedData);
          const updated = await clubModel.findById(id);
          return updated;
      }catch(exception){
          throw exception;
      }
  }

  async deleteClub(req){
      const { id } = req.params;
      try{
          const club = await clubModel.findById(id);
          if (!club){
              throw {
                  code: 404,
                  message: "Club not found",
                  status: "CLUB_NOT_FOUND"
              };
          }

          await clubModel.remove(id);
          return { club_id: id };
      }catch(exception){
          throw exception;
      }
  }
  
async joinClub(req){
        const { id } = req.params;
        const loggedInUser = req.loggedInUser;

        try{
            const club = await clubModel.findById(id);
            if (!club){
                throw {
                    code: 404,
                    message: "Club not found",
                    status: "CLUB_NOT_FOUND"
                };
            }

            if (loggedInUser.club_id){
                throw {
                    code: 400,
                    message: "You have already joined a club",
                    status: "ALREADY_IN_CLUB"
                };
            }

            await userSvc.updateUserByFilter({ club_id: id }, { user_id: loggedInUser.user_id });
            return { user_id: loggedInUser.user_id, club_id: id };
        }catch(exception){
            throw exception;
        }
    }

async leaveClub(req){
        const loggedInUser = req.loggedInUser;

        try{
            if (!loggedInUser.club_id){
                throw {
                    code: 400,
                    message: "You are not part of any club",
                    status: "NOT_IN_CLUB"
                };
            }

            await userSvc.updateUserByFilter({ club_id: null }, { user_id: loggedInUser.user_id });
            return { user_id: loggedInUser.user_id };
        }catch(exception){
            throw exception;
        }
    }
}

const clubSvc = new ClubService();

module.exports = clubSvc;