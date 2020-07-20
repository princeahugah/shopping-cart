import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import mountFunction from './helpers/mountComponent';
import { expect } from 'chai';
import SigninForm from '@/components/SigninForm.vue';
import { UserModule } from '@/store/modules/user';
import sinon from 'sinon';

declare const global: any;
global.requestAnimationFrame = (cb: any) => cb();

describe('SigninForm.vue', () => {
  describe('When the component is rendered', () => {
    let wrapper: Wrapper<Vue>;
    beforeEach(() => {
      wrapper = mountFunction(SigninForm, { useMount: true });
    });

    after(() => {
      sinon.restore();
    });

    it('there should be no errors on the form', () => {
      const errorMessage = wrapper.find('.sign-in-form .error-message');

      expect(errorMessage.exists()).to.be.false;
      expect((wrapper.vm as any).errorMessage).to.equal(null);
      expect((wrapper.vm as any).emailErrors).to.be.an('array');
      expect((wrapper.vm as any).emailErrors.length).to.equal(0);
      expect((wrapper.vm as any).passwordErrors).to.be.an('array');
      expect((wrapper.vm as any).passwordErrors.length).to.equal(0);
    });

    it('should display a validation error when the email field is empty', () => {
      wrapper.find('.sign-in-form .email input').setValue('');

      expect((wrapper.vm as any).emailErrors).to.be.an('array');
      expect((wrapper.vm as any).emailErrors.length).to.equal(1);
      expect((wrapper.vm as any).emailErrors[0]).to.equal('This field is required');
    });

    it('should display a validation error when a wrong email address is entered', () => {
      wrapper.find('.sign-in-form .email input').setValue('fake email');

      expect((wrapper.vm as any).emailErrors).to.be.an('array');
      expect((wrapper.vm as any).emailErrors.length).to.equal(1);
      expect((wrapper.vm as any).emailErrors[0]).to.equal('Invalid email address');
    });

    it('should display a validation error when the password field is empty', () => {
      wrapper.find('.sign-in-form .password input').setValue('');

      expect((wrapper.vm as any).passwordErrors).to.be.an('array');
      expect((wrapper.vm as any).passwordErrors.length).to.equal(1);
      expect((wrapper.vm as any).passwordErrors[0]).to.equal('This field is required');
    });

    it('should call submitForm when the form is submitted', async () => {
      const formSpy = sinon.spy(wrapper.vm as any, 'submitForm');
      const userModuleStub = sinon.stub(UserModule, 'AuthenticateUser').resolves();

      const emailAddress = 'testemail@example.com';
      const password = 'testpass';
      wrapper.find('.sign-in-form .email input').setValue(emailAddress);
      wrapper.find('.sign-in-form .password input').setValue(password);
      wrapper.find('.sign-in-form form').trigger('submit');
      await wrapper.vm.$nextTick();

      expect(formSpy.calledOnce).to.be.true;
      expect(userModuleStub.calledOnce).to.be.true;
      expect(userModuleStub.calledOnceWith((wrapper.vm as any).form)).to.be.true;
      expect((wrapper.vm as any).form).to.deep.equal({ emailAddress, password });
    });
  });
});
