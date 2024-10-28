import { Capsule } from "@/types/capsule";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const AddCapsuleModal = ({ onAdd }: { onAdd: (capsule: Capsule) => void }) => {
  const validationSchema = Yup.object().shape({
    capsule_serial: Yup.string().required("Capsule serial is required"),
    capsule_id: Yup.string().required("Capsule status is required"),
    status: Yup.string().required("Capsule launch date is required"),
    original_launch: Yup.string().required("Capsule land date is required"),
    type: Yup.string().required("Capsule reuse count is required"),
  });

  const initialValues: Capsule = {
    capsule_serial: "",
    capsule_id: "",
    status: "",
    original_launch: "",
    type: "",
    details: "",
    landings: 0,
    reuse_count: 0,
  };

  const handleSubmit = (values: Capsule) => {
    const newCapsule: Capsule = {
      ...values,
    };

    onAdd(newCapsule);
    console.log("submitting capsule");
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Field name="capsule_serial" placeholder="Capsule Serial" />
            <ErrorMessage
              name="capsule_serial"
              component="div"
              className="error"
            />
            <Field name="capsule_id" placeholder="Capsule ID" />
            <Field name="status" placeholder="Status" />
            <Field name="original_launch" placeholder="Original Launch" />
            <Field name="type" placeholder="Type" />
            <Field name="details" placeholder="Details" />
            <Field name="landings" type="number" placeholder="Landings" />
            <Field name="reuse_count" type="number" placeholder="Reuse Count" />

            <button type="submit">Add Capsule</button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddCapsuleModal;
