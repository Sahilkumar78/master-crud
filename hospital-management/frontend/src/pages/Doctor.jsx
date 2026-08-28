import React, { useEffect, useState } from "react";

const Doctor = () => {

    // Form states
    const [name, setName] = useState("");
    const [speciality, setSpeciality] = useState("");

    // Doctors fetched from database
    const [doctors, setDoctors] = useState([]);

    // ID of doctor currently being edited
    const [editId, setEditId] = useState(null);


    // =========================
    // GET ALL DOCTORS
    // =========================

    const getAllDoctors = async () => {

        try {

            const response = await fetch(
                "http://localhost:8000/api/v1/doctor"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch doctors");
            }

            const data = await response.json();

            console.log("Doctors data:", data);

            setDoctors(data.data);

        } catch (error) {

            console.log(
                "Error while fetching doctors:",
                error
            );
        }
    };


    useEffect(() => {
        getAllDoctors();
    }, []);


    // =========================
    // CREATE / UPDATE DOCTOR
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const doctorData = {
            name,
            speciality
        };

        try {

            let response;

            // UPDATE
            if (editId) {

                response = await fetch(
                    `http://localhost:8000/api/v1/doctor/${editId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(doctorData)
                    }
                );

            }

            // CREATE
            else {

                response = await fetch(
                    "http://localhost:8000/api/v1/doctor/createdoctor",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(doctorData)
                    }
                );

            }


            if (!response.ok) {
                throw new Error("Failed to save doctor");
            }


            const data = await response.json();

            console.log("Backend response:", data);


            // Clear form
            setName("");
            setSpeciality("");
            setEditId(null);


            // Fetch latest doctors
            getAllDoctors();


        } catch (error) {

            console.log(
                "Error while creating/updating doctor:",
                error
            );
        }
    };


    // =========================
    // DELETE DOCTOR
    // =========================

    const handleDelete = async (id) => {

        try {

            const response = await fetch(
                `http://localhost:8000/api/v1/doctor/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {
                throw new Error("Failed to delete doctor");
            }


            const data = await response.json();

            console.log("Delete response:", data);


            // Refresh doctors
            getAllDoctors();


        } catch (error) {

            console.log(
                "Error while deleting doctor:",
                error
            );
        }
    };


    // =========================
    // EDIT DOCTOR
    // =========================

    const handleEdit = (doctor) => {

        setEditId(doctor._id);

        setName(doctor.name);

        setSpeciality(doctor.speciality);
    };


    // =========================
    // CANCEL UPDATE
    // =========================

    const handleCancel = () => {

        setEditId(null);

        setName("");

        setSpeciality("");
    };


    return (

        <div className="flex items-start justify-center mt-15 gap-20">


            {/* ================= FORM ================= */}

            <div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >

                    <h2 className="text-xl font-bold">
                        {editId
                            ? "Update Doctor"
                            : "Add Doctor"
                        }
                    </h2>


                    {/* DOCTOR NAME */}

                    <div className="flex gap-10">

                        <label>
                            Doctor
                        </label>

                        <input
                            type="text"
                            placeholder="Enter doctor name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="border px-3 py-1"
                        />

                    </div>


                    {/* SPECIALITY */}

                    <div className="flex gap-10">

                        <label>
                            Speciality
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Doctor's speciality"
                            value={speciality}
                            onChange={(e) =>
                                setSpeciality(e.target.value)
                            }
                            className="border px-3 py-1"
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="bg-red-400 px-3 py-2 rounded-xl"
                    >
                        {editId
                            ? "Update Doctor"
                            : "Add Doctor"
                        }
                    </button>


                    {/* CANCEL */}

                    {editId && (

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 px-3 py-2 rounded-xl"
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>


            {/* ================= DOCTORS ================= */}

            <div className="flex flex-col gap-3 w-80">

                <h2 className="text-xl font-bold">
                    Doctors
                </h2>


                {doctors.length === 0 ? (

                    <p>
                        Doctors data will be shown here once fetched
                    </p>

                ) : (

                    doctors.map((doctor) => (

                        <div
                            className="border flex flex-col p-3 rounded-xl"
                            key={doctor._id}
                        >

                            <p>
                                <strong>
                                    Doctor:
                                </strong>{" "}
                                {doctor.name}
                            </p>


                            <p>
                                <strong>
                                    Speciality:
                                </strong>{" "}
                                {doctor.speciality}
                            </p>


                            {/* BUTTONS */}

                            <div className="flex justify-center gap-3 mt-3">

                                <button
                                    onClick={() =>
                                        handleEdit(doctor)
                                    }
                                    className="bg-yellow-300 p-1 rounded-xl px-3 cursor-pointer"
                                >
                                    Update
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            doctor._id
                                        )
                                    }
                                    className="bg-blue-300 p-1 rounded-xl px-3 cursor-pointer"
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

export default Doctor;