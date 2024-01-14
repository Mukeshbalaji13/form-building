//ReduxStore
export const initialState = {
    signUpData: [
        {
            Email: "",
            UserName: "",
            Password: "",
            ConfirmPassword:""
        }
    ],
    SelectedFormName: null,
    SelectedFormId: null,
    formsList : [],
    componentsDropped: [],
    LoginNotification: false
}


export function setRedux(state = initialState, action = {}){
    switch(action.type){
        case 'SET_SIGNUP':
            return{
                ...state,
                signUpData:[
                    {
                        Email: action.Email,
                        UserName: action.UserName,
                        Password: action.Password,
                        ConfirmPassword: action.ConfirmPassword
                    }
                ]
            }
            case 'SET_FORMS':
                return{
                    ...state,
                    SelectedFormName: action.selectedFormName,
                    SelectedFormId: action.selectedFormId,
                }

            case 'FORM_DATA':
                return{
                    ...state,
                    formsList: [...state.formsList, action.data]
                }

            case 'UPDATE_FORM':
                return{
                    ...state,
                    formsList: action.updatedForms
                }

            case 'DELETE_FORM':
                return{
                    ...state,
                    formsList: state.formsList.filter((_, index) => index !== action.index),
                }

            case 'FORM_COMPONENTS':
                return{
                    ...state,
                    componentsDropped: action.formComponents
                }
            case 'SAVE_FORM':
                return {
                    ...state,
                    formsList: state.formsList.map((e)=>{
                        if(state.SelectedFormId===e.formId){
                            return{
                                ...e,
                                formBuilt: action.dropped,
                                updated: new Date().toLocaleString()
                            }
                        }
                        else{
                            return e;
                        }
                    }),
                    componentsDropped: action.dropped
                }
                case 'NOTIFICATION_TOGGLE':
                    return{
                        ...state,
                        LoginNotification : action.data
                    }
                    case 'NOTIFICATION_OFF':
                        return{
                            ...state,
                            LoginNotification : action.data
                        }
            default :
                return state;
    }
}