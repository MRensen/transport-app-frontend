import styles from "./PlannerHome/PlannerHome.module.css"
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../components/Context/AuthContextProvider";

export default function DriverDetails({checkedMenu, setCheckedMenu, create}) {
    const {refresh} = useContext(AuthContext);
    const history = useHistory();
    const [driverData, setDriverData] = useState(null);
    const [photo, setPhoto] = useState("");
    const [unmount, setUnmount] = useState("");
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        async function getDriver() {
            if (!create) {
                try {
                    const result = await axios({
                        method: 'get',
                        url: `http://localhost:8080/drivers/${checkedMenu}`,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                        }
                    })
                    setDriverData(result.data);
                    reset({
                        naam: `${result.data.firstName} ${result.data.lastName}`,
                        postcode: result.data.postalcode,
                        adres: result.data.street,
                        huisnummer: result.data.houseNumber,
                        city: result.data.city,
                        'personeels nummer': result.data.employeeNumber,
                        'vaste wagen': result.data.regularTruck,
                        'rijbewijs nummer': result.data.driverLicenseNumber,
                        'telefoon nummer': result.data.phoneNumber,
                        enabled: result.data.enabled
                    });
                } catch (e) {
                    console.log(e.message)
                    return null;
                }
            }
        }


        getDriver();
        setImageDataInUseEffect();

    }, [checkedMenu])

    useEffect(() => {
        reset();
    }, [unmount])


    async function formSubmit(data) {
        console.log("saveing....")
        const check = window.confirm("Weet je zeker dat je deze wijziging wilt opslaan?");
        if (check) {
            const method = create ? "post" : "patch";
            const baseurl = "http://localhost:8080/drivers";
            const url = create ? "" : `/${checkedMenu}`;
            const [firstName, lastName] = data.naam.split(" ");
            const toSend = {
                firstName,
                lastName,
                street: data.adres,
                houseNumber: data.huisnummer,
                postalCode: data.postcode,
                city: data.city,
                employeeNumber: data['personeels nummer'],
                regularTruck: data['vaste wagen'],
                driverLicenseNumber: data['rijbewijs nummer'],
                phoneNumber: data['telefoon nummer'],
            }
            create &&
            (toSend.enabled = true) &&
            (toSend.username = data.naam.split(" ").join("")) &&
            (toSend.password = "$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K")

            try {
                await axios({
                    method: method,
                    url: baseurl + url,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    },
                    data: toSend
                })
                refresh()
                cancelFunction("saved")
            } catch(e){console.error(e.message)}
        }

    }

    function cancelFunction(value = "cancel") {
        if (create) {
            history.push(`/planner/${checkedMenu}s`)
        } else {
            setCheckedMenu(null);
            setDriverData(null);
            reset();
            setUnmount(value);
        }
    }

    async function deleteFunction() {
        if (window.confirm("Weet je zeker dat je deze gebruiker wilt verwijderen?")) {
            await axios({
                method: "delete",
                url: `http://localhost:8080/drivers/${checkedMenu}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            cancelFunction("delete")
        }

    }

    function resetFunction() {
        console.log("reset")
        reset()
    }

    async function sendImage(toSend) {
        try {
            await axios({
                method: "patch",
                url: `http://localhost:8080/user/${data.username}/photo`,
                data: toSend,
                params: toSend,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
        } catch (e) {
            console.error(e.message)
        }
    }

    function setImage(e) {
        // console.log(e.target.files[0])

        const formData = new FormData();
        formData.append("image", e.target.files[0])
        console.log(formData)
        sendImage(formData);

        let fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            let base64Data = fileLoadedEvent.target.result;
            const [header, data] = base64Data.split(",")
            setPhoto(data)
            console.log(fileLoadedEvent)
        }
        fileReader.readAsDataURL(e.target.files[0]);


    }

    async function setImageDataInUseEffect(){
        try {
            const image = await axios({
                method: "get",
                url: `http://localhost:8080/user/${data.username}/photo`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setPhoto(image.data);
        } catch(e) {console.error(e.message)}
    }


    if (driverData || create) {
        return (
            <>
                <header className={styles.options}>
                    <button type="button" onClick={deleteFunction} className={create && styles.invisible}>Delete
                    </button>
                    <button type="button" onClick={handleSubmit(formSubmit)}>Save</button>
                    {create ?
                        <button type="button" onClick={() => {
                            resetFunction()
                        }}>Reset</button>
                        :
                        <button type="button" onClick={() => {
                            cancelFunction()
                        }}>Cancel</button>
                    }
                </header>

                <form className={styles.content} onSubmit={handleSubmit(formSubmit)}
                      onChange={console.log("form changed")}>
                    <div className={styles['image-container']}>
                        {photo ?
                            <img src={`data:image/jpeg;base64,${photo}`} className={styles.image}/>
                            :
                            <img src={photo} className={styles.image}/>
                        }
                        {create &&
                        <input type="file" accept="image/*" className={styles['foto-wijzigen']} onChange={(e) => {
                            setImage(e)
                        }}/>
                        }
                    </div>
                    <LabeledInput errors={errors} register={register} title="naam"/>
                    <LabeledInput errors={errors} register={register} title="adres">
                        <input type="text" className={styles.housenumber} id="adres"
                               {...register('huisnummer')}/>
                    </LabeledInput>
                    <LabeledInput errors={errors} register={register} title="postcode"/>
                    <LabeledInput errors={errors} register={register} title="city"/>
                    <LabeledInput errors={errors} register={register} title="personeels nummer"/>
                    <LabeledInput errors={errors} register={register} title="vaste wagen"/>
                    <LabeledInput errors={errors} register={register} title="rijbewijs nummer"/>
                    <LabeledInput errors={errors} register={register} title="telefoon nummer" className="bottom-label"/>
                    <LabeledInput errors={errors} register={register} className="checked" checked title="enabled"/>
                </form>
            </>
        )
    } else return (
        <>
            {unmount === "delete" ?
                <p>deleted...</p>
                :
                unmount === "saved" ?
                    <p>saved...</p>
                    :
                    <p></p>
            }
            <p>Please select a driver</p>
        </>
    );
}