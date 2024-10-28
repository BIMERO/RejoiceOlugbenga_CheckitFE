import React from "react";
import { Capsule } from "@/types/capsule";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditCapsule = ({
  onEdit,
  capsulesData,
  onClose,
}: {
  onEdit: (capsule: Capsule) => void;
  capsulesData: Capsule;
  onClose: () => void;
}) => {
  const validationSchema = Yup.object().shape({
    capsule_serial: Yup.string().required("Capsule serial is required"),
    capsule_id: Yup.string().required("Capsule ID is required"),
    status: Yup.string().required("Status is required"),
    original_launch: Yup.date()
      .required("Original launch date is required")
      .typeError("Please enter a valid date"),
    type: Yup.string().required("Type is required"),
    details: Yup.string(), // Optional field
    landings: Yup.number()
      .min(0, "Landings must be a non-negative number")
      .required("Landings are required"),
    reuse_count: Yup.number()
      .min(0, "Reuse count must be a non-negative number")
      .required("Reuse count is required"),
    // missions: Yup.string(), // Optional field
  });

  const initialValues: Capsule = {
    capsule_serial: capsulesData.capsule_serial,
    capsule_id: capsulesData.capsule_id,
    status: capsulesData.status,
    original_launch: capsulesData.original_launch,
    type: capsulesData.type,
    details: capsulesData.details || "",
    landings: capsulesData.landings || 0,
    reuse_count: capsulesData.reuse_count || 0,
    //  missions: capsulesData.missions.map((mission) => mission.name).join(", "), // Convert missions array to comma-separated string
  };

  const handleSubmit = (values: Capsule) => {
    // const missionsArray = values.missions
    //   ? values.missions
    //       .split(",")
    //       .map((mission: string) => ({ name: mission.trim() }))
    //   : [];

    const updatedCapsule: Capsule = {
      ...values,
      //   missions: missionsArray,
    };

    console.log("Submitting updated capsule:", updatedCapsule); // Log the updated capsule data
    onEdit(updatedCapsule);
    onClose();
  };

  return (
    <section>
      <h2>Edit Capsule</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field name="capsule_serial" placeholder="Capsule Serial" />
              <ErrorMessage
                name="capsule_serial"
                component="div"
                className="error"
              />
            </div>
            <div>
              <Field name="capsule_id" placeholder="Capsule ID" />
              <ErrorMessage
                name="capsule_id"
                component="div"
                className="error"
              />
            </div>
            <div>
              <Field name="status" placeholder="Status" />
              <ErrorMessage name="status" component="div" className="error" />
            </div>
            <div>
              <Field
                name="original_launch"
                type="date"
                placeholder="Original Launch"
              />
              <ErrorMessage
                name="original_launch"
                component="div"
                className="error"
              />
            </div>
            <div>
              <Field name="type" placeholder="Type" />
              <ErrorMessage name="type" component="div" className="error" />
            </div>
            <div>
              <Field name="details" placeholder="Details" />
              <ErrorMessage name="details" component="div" className="error" />
            </div>
            <div>
              <Field name="landings" type="number" placeholder="Landings" />
              <ErrorMessage name="landings" component="div" className="error" />
            </div>
            <div>
              <Field
                name="reuse_count"
                type="number"
                placeholder="Reuse Count"
              />
              <ErrorMessage
                name="reuse_count"
                component="div"
                className="error"
              />
            </div>
            <div>
              <Field name="missions" placeholder="Missions (comma-separated)" />
              <ErrorMessage name="missions" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Update Capsule
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EditCapsule;
