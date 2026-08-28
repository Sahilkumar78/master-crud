import React, { useEffect, useState } from "react";

const Patient = () => {

    // =========================
    // FORM STATES
    // =========================

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    // Patients fetched from database
    const [patients, setPatients] = useState([]);

    // ID of patient currently being edited
    const [editId, setEditId] = useState(null);


    // =========================
    // GET ALL PATIENTS
    // =========================

    const getAllPatients = async () => {

        try {

            const response = await fetch(
                "http://localhost:8000/api/v1/patient"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch patients");
            }

            const data = await response.json();

            console.log("Patients data:", data);

            setPatients(data.data);

        } catch (error) {

            console.log(
                "Error while fetching patients:",
                error
            );
        }
    };


    useEffect(() => {
        getAllPatients();
    }, []);


    // =========================
    // CREATE / UPDATE PATIENT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const patientData = {
            name,
            age,
            gender
        };

        try {

            let response;

            // UPDATE
            if (editId) {

                response = await fetch(
                    `http://localhost:8000/api/v1/patient/${editId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(patientData)
                    }
                );

            }

            // CREATE
            else {

                response = await fetch(
                    "http://localhost:8000/api/v1/patient/addpatient",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(patientData)
                    }
                );

            }


            if (!response.ok) {
                throw new Error("Failed to save patient");
            }


            const data = await response.json();

            console.log(
                "Backend response:",
                data
            );


            // Clear form
            setName("");
            setAge("");
            setGender("");
            setEditId(null);


            // Get latest patients
            getAllPatients();


        } catch (error) {

            console.log(
                "Error while creating/updating patient:",
                error
            );
        }
    };


    // =========================
    // DELETE PATIENT
    // =========================

    const handleDelete = async (id) => {

        try {

            const response = await fetch(
                `http://localhost:8000/api/v1/patient/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {
                throw new Error("Failed to delete patient");
            }


            const data = await response.json();

            console.log(
                "Delete response:",
                data
            );


            // Refresh patient list
            getAllPatients();


        } catch (error) {

            console.log(
                "Error while deleting patient:",
                error
            );
        }
    };


    // =========================
    // EDIT PATIENT
    // =========================

    const handleEdit = (patient) => {

        setEditId(patient._id);

        setName(patient.name);

        setAge(patient.age);

        setGender(patient.gender);
    };


    // =========================
    // CANCEL UPDATE
    // =========================

    const handleCancel = () => {

        setEditId(null);

        setName("");
        setAge("");
        setGender("");
    };


    return (

        <div className="flex items-start justify-center mt-15 gap-20">


            {/* =========================
                PATIENT FORM
            ========================= */}

            <div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >

                    <h1 className="text-2xl font-bold">
                        {editId
                            ? "Update Patient"
                            : "Add Patient"
                        }
                    </h1>


                    {/* NAME */}

                    <div className="flex gap-10">

                        <label>
                            Patient Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter patient name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="border px-3 py-1"
                        />

                    </div>


                    {/* AGE */}

                    <div className="flex gap-10">

                        <label>
                            Age
                        </label>

                        <input
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) =>
                                setAge(e.target.value)
                            }
                            className="border px-3 py-1"
                        />

                    </div>


                    {/* GENDER */}

                    <div className="flex gap-10">

                        <label>
                            Gender
                        </label>

                        <select
                            value={gender}
                            onChange={(e) =>
                                setGender(e.target.value)
                            }
                            className="border px-3 py-1"
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="bg-red-400 px-3 py-2 rounded-xl cursor-pointer"
                    >
                        {editId
                            ? "Update Patient"
                            : "Add Patient"
                        }
                    </button>


                    {/* CANCEL */}

                    {editId && (

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 px-3 py-2 rounded-xl cursor-pointer"
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>


            {/* =========================
                PATIENT LIST
            ========================= */}

            <div className="flex flex-col gap-3 w-80">

                <h2 className="text-xl font-bold">
                    Patients
                </h2>


                {patients.length === 0 ? (

                    <p>
                        Patient data will be shown here once fetched
                    </p>

                ) : (

                    patients.map((patient) => (

                        <div
                            key={patient._id}
                            className="border p-4 rounded-xl"
                        >

                            <p>
                                <strong>
                                    Patient:
                                </strong>{" "}
                                {patient.name}
                            </p>


                            <p>
                                <strong>
                                    Age:
                                </strong>{" "}
                                {patient.age}
                            </p>


                            <p>
                                <strong>
                                    Gender:
                                </strong>{" "}
                                {patient.gender}
                            </p>


                            {/* BUTTONS */}

                            <div className="flex gap-3 mt-3">

                                <button
                                    onClick={() =>
                                        handleEdit(patient)
                                    }
                                    className="bg-yellow-300 p-1 px-3 rounded-xl cursor-pointer"
                                >
                                    Update
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            patient._id
                                        )
                                    }
                                    className="bg-blue-300 p-1 px-3 rounded-xl cursor-pointer"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default Patient;