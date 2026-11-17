import { UserAccount } from '../types/insurance';

const ADMIN_CONSOLE_ROLES = new Set([
  'super_admin',
  'admin',
  'executive',
  'department_manager',
  'branch_manager',
  'finance',
  'marketing'
]);

const STAFF_WORKSPACE_ROLES = new Set([
  'staff',
  'underwriter',
  'claims_officer',
  'super_admin',
  'admin'
]);

const OPERATOR_WORKSPACE_ROLES = new Set([
  'operator',
  'agent',
  'broker',
  'super_admin',
  'admin'
]);

export function getDestinationForAccount(user: UserAccount, intendedRedirect?: string): string {
  if (
    user.accountStatus === 'suspended' ||
    user.accountStatus === 'deactivated' ||
    user.accountStatus === 'pending_verification'
  ) {
    return '/account-status';
  }
  if (user.accountType === 'customer' && user.onboardingStatus === 'incomplete') {
    return intendedRedirect ? `/onboarding?redirect=${encodeURIComponent(intendedRedirect)}` : '/onboarding';
  }
  if (intendedRedirect && intendedRedirect !== '/login' && intendedRedirect !== '/register') {
    if (
      intendedRedirect.startsWith('/admin') &&
      !ADMIN_CONSOLE_ROLES.has(user.accountType) &&
      user.accountType !== 'operator'
    ) {
      return '/portal';
    }
    if (intendedRedirect.startsWith('/staff') && !STAFF_WORKSPACE_ROLES.has(user.accountType)) {
      return '/portal';
    }
    if (intendedRedirect.startsWith('/operator') && !OPERATOR_WORKSPACE_ROLES.has(user.accountType)) {
      return '/portal';
    }
    return intendedRedirect;
  }
  if (ADMIN_CONSOLE_ROLES.has(user.accountType)) {
    return '/admin';
  }
  if (user.accountType === 'underwriter' || user.accountType === 'claims_officer' || user.accountType === 'staff') {
    return '/staff';
  }
  if (user.accountType === 'operator' || user.accountType === 'agent' || user.accountType === 'broker') {
    return '/operator';
  }
  return '/portal';
}
