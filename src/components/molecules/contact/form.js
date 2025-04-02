"use client";

import { Button, Container, RichText, Text } from "@/components/atoms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendMail } from "@/server/brevo/sendMail";
import { clsx } from "clsx";

export const Form = ({ t, title }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      mail: "",
      message: "",
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendMail({
        data,
        templateId: 2,
      });

      setShowSuccessMessage(true);
      reset();
      setIsSubmitting(false);
    } catch (e) {
      setShowErrorMessage(true);
      setIsSubmitting(false);
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
      <div className="">
        <div className="mt-2">
          <input
            placeholder={t?.firstname}
            className="block w-full placeholder:text-black/75 bg-white/50 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-primary-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-500 sm:text-sm/6"
            {...register("firstname", { required: true })}
          />{" "}
          {errors.firstname?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t?.validation[errors.firstname.type]}
            </Text>
          )}
        </div>
      </div>
      <div className="">
        <div className="mt-2">
          <input
            placeholder={t?.mail}
            {...register("mail", { required: true })}
            className="block w-full placeholder:text-black/75 bg-white/50 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-primary-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-500 sm:text-sm/6"
          />
          {errors.mail?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t?.validation[errors.mail.type]}
            </Text>
          )}
        </div>
      </div>
      <div className="">
        <div className="mt-2">
          <textarea
            placeholder={t?.message}
            {...register("message", { required: true })}
            rows={6}
            className="block w-full resize-none placeholder:text-black/75 bg-white/50 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-primary-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-500 sm:text-sm/6"
          />
          {errors.message?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t?.validation[errors.message.type]}
            </Text>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          buttonType="submit"
          variant="white"
          disabled={isSubmitting}
          callToAction={t?.send}
        />
      </div>
    </form>
  );
};
