import * as yup from "yup";
import { CreateProfileParams, LoginParams } from "../../Redux/user/user.entity";
import strings from "../../Assets/Languages";


interface Validation {
    login: any
    loginByPhone: any
    editProfile: any
    email_only: any
    phone_only: any
    forgotPass: any
    signup: any
    changePassword: any
    resetPassword: any
}

const validations: Validation = {

    login: yup.object().shape({
        email: yup
            .string()
            // .email(strings.PLEASE_ENTER_VALID_EMAIL)
            .min(8, ({ min }) => `${strings.PleaseEnterValidEmailorPhoneNumber}`)
            .required(strings.PLEASE_ENTER_YOUR_EMAIL),
        password: yup
            .string()
            .min(
                8,
                ({ min }) => `${strings.Password_must_be} ${min} ${strings.characters}`
            )
            .required(strings.PLEASE_ENTER_PASSWORD),
    }),
    // loginByPhone: yup.object().shape({
    //     phoneNumber: yup.string().required(strings.PLEASE_ENTER_YOUR_PHONE_NUMBER),
    //     password: yup
    //         .string()
    //         .min(
    //             8,
    //             ({ min }) => `${strings.Password_must_be} ${min} ${strings.characters}`
    //         )
    //         .required(strings.PLEASE_ENTER_PASSWORD),
    // }),
    // email_only: yup.object().shape({
    //     email: yup
    //         .string()
    //         // .email(strings.PLEASE_ENTER_VALID_EMAIL)
    //         .min(8, ({ min }) => `${strings.PleaseEnterValidEmailorPhoneNumber}`)
    //         .required(strings.PLEASE_ENTER_YOUR_EMAIL),
    // }),
    // phone_only: yup.object().shape({
    //     phoneNumber: yup.string().required(strings.PLEASE_ENTER_YOUR_PHONE_NUMBER),

    // }),
    // forgotPass: yup.object().shape({
    //     newPassword: yup
    //         .string()

    //         .matches(
    //             /\w*[a-z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.small_letter}`
    //         )
    //         .matches(
    //             /\w*[A-Z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.capital_letter}`
    //         )
    //         .matches(/\d/, `${strings.Password_must_have_a} ${strings.number}`)
    //         .matches(
    //             /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //             `${strings.Password_must_have_a}${strings.special_character}`
    //         )
    //         .min(
    //             8,
    //             ({ min }) => `${strings.Password_must_be} ${min} ${strings.characters}`
    //         )
    //         .required(strings.PLEASE_ENTER_NEW_PASSWORD),
    //     confimPass: yup
    //         .string()
    //         .oneOf([yup.ref("newPassword")], `${strings.Password_not_matched}`)
    //         .required(`${strings.PLEASE_ENTER_Confirm_PASSWORD}`),
    // }),
    // resetPassword: yup.object().shape({
    //     newPassword: yup
    //         .string()
    //         .matches(
    //             /\w*[a-z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.small_letter}`
    //         )

    //         .matches(
    //             /\w*[A-Z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.capital_letter}`
    //         )
    //         .matches(/\d/, `${strings.Password_must_have_a} ${strings.number}`)
    //         .matches(
    //             /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //             `${strings.Password_must_have_a}${strings.special_character}`
    //         )
    //         .min(
    //             8,
    //             ({ min }) => `${strings.Password_must_be} ${min} ${strings.characters}`
    //         )
    //         .required(strings.PLEASE_ENTER_NEW_PASSWORD),
    //     confimPass: yup
    //         .string()
    //         .oneOf([yup.ref("newPassword")], `${strings.Password_not_matched}`)
    //         .required(`${strings.PLEASE_ENTER_Confirm_PASSWORD}`),
    // }),
    // changePassword: yup.object().shape({
    //     oldPassword: yup
    //         .string()
    //         .matches(
    //             /\w*[a-z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.small_letter}`
    //         )

    //         .matches(
    //             /\w*[A-Z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.capital_letter}`
    //         )
    //         .matches(/\d/, `${strings.Password_must_have_a} ${strings.number}`)
    //         .matches(
    //             /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //             `${strings.Password_must_have_a}${strings.special_character}`
    //         )
    //         .min(
    //             8,
    //             ({ min }) => `${strings.Password_must_be} ${min} ${strings.characters}`
    //         )
    //         .required(strings.PLEASE_ENTER_OLD_PASSWORD),
    //     newPassword: yup
    //         .string()
    //         .matches(
    //             /\w*[a-z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.small_letter}`
    //         )

    //         .matches(
    //             /\w*[A-Z]\w*/,
    //             `${strings.Password_must_have_a} ${strings.capital_letter}`
    //         )
    //         .matches(/\d/, `${strings.Password_must_have_a} ${strings.number}`)
    //         .matches(
    //             /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //             `${strings.Password_must_have_a}${strings.special_character}`
    //         )
    //         .min(
    //             8,
    //             ({ min }) => `${strings.Password_must_be} ${min} ${strings.characters}`
    //         )
    //         .required(strings.PLEASE_ENTER_NEW_PASSWORD),
    //     confimPass: yup
    //         .string()
    //         .oneOf([yup.ref("newPassword")], `${strings.Password_not_matched}`)
    //         .required(`${strings.PLEASE_ENTER_Confirm_PASSWORD}`),
    // }),
    signup: yup.object().shape({
        phone_number: yup.string().required(strings.PLEASE_ENTER_YOUR_PHONE_NUMBER),
        name: yup
            .string()
            .min(
                4,
                ({ min }) => `${strings.FirstName_must_be} ${min} ${strings.characters}`
            )
            .required(strings.PLEASE_ENTER_BRAND_Name),
        email: yup
            .string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                `${strings.PLEASE_ENTER_VALID_EMAIL}`
            )

            .required(strings.PLEASE_ENTER_YOUR_EMAIL),
        password: yup
            .string()
            .matches(
                /\w*[a-z]\w*/,
                `${strings.Password_must_have_a} ${strings.small_letter}`
            )
            .matches(
                /\w*[A-Z]\w*/,
                `${strings.Password_must_have_a} ${strings.capital_letter}`
            )

            .matches(/\d/, `${strings.Password_must_have_a} ${strings.number}`)
            .matches(
                /[!@#$%^&*()\-_"=+{}; :,<.>]/,
                `${strings.Password_must_have_a}${strings.special_character}`
            )
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*[\uD800-\uDFFF]).{8,}$/,
                `${strings.valid_password}`
            )
            .min(
                8,
                ({ min }) => `${strings.Password_must_be} ${min} ${strings.characters}`
            )
            .required(strings.PLEASE_ENTER_PASSWORD),
        confimPass: yup
            .string()
            .oneOf([yup.ref('password')], `${strings.Password_not_matched}`)
            .required(`${strings.PLEASE_ENTER_Confirm_PASSWORD}`),
        gstIn: yup
            .string()
            .min(
                15,
                ({ min }) => `${strings.GSTIN_must_be} ${min} ${strings.characters}`
            )
            .required(strings.PLEASE_ENTER_GSTIN),
    }),
    // editProfile: yup.object().shape({
    //     name: yup
    //         .string()
    //         .min(
    //             4,
    //             ({ min }) => `${strings.FirstName_must_be} ${min} ${strings.characters}`
    //         )
    //         .required(strings.PLEASE_ENTER_YOUR_FirstName),
    //     email: yup
    //         .string()
    //         .matches(
    //             /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //             `${strings.PLEASE_ENTER_VALID_EMAIL}`
    //         )

    //         .required(strings.PLEASE_ENTER_YOUR_EMAIL),
    //     phone_number: yup.string().required(strings.PLEASE_ENTER_YOUR_PHONE_NUMBER),
    //     public_hash: yup
    //         .string()
    //         .required(strings.PLEASE_ENTER_YOUR_WALLET_ADDRESS)
    //         .min(
    //             15,
    //             ({ min }) => `${strings.Please_enter_valid_address}`
    //         )
    // }
    // )
}
export { validations }