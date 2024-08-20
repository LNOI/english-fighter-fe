import React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { doSocialLogin } from '@/app/actions';
function SocialLogin({ provider }) {
  return (
    <div className="my-2 flex flex-col space-y-4">
      <form action={doSocialLogin}>
        <div className="flex w-full items-center justify-center rounded-sm bg-gray-800">
          <Button
            type="submit"
            sx={{
              paddingY: '0.75rem'
            }}
            className="w-full rounded-[30px] bg-button-custom normal-case not-italic"
            // onClick={async () => await signIn(provider)}
          >
            <input
              type="text"
              hidden
              name="social"
              value={provider}
              id="social"
            />
            <Image
              className="float-left"
              src="/icon/logo_google.png"
              width={30}
              height={30}
              alt="Button google"
            ></Image>
            <p className="w-full font-medium text-gray-200">
              Sign in with {provider}
            </p>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SocialLogin;
